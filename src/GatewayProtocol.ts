import * as crypto from 'crypto';
import * as pkcs7 from 'pkcs7-padding';

// Gateways on newer firmware answer requests they cannot handle with a fixed 33-byte frame:
//   bytes 0-27 encrypted payload, byte 28 sequence counter, bytes 29-31 session tag,
//   byte 32 trailer: 0xAE = request rejected, 0xAF = gateway expects the new protocol.
export const FRAME_33_LENGTH = 33;
export const REJECT_TRAILER = 0xae;
export const NEW_PROTOCOL_TRAILER = 0xaf;

export function getFrame33Trailer(raw: Buffer): 'reject' | 'new-protocol' | null {
  if (raw.length !== FRAME_33_LENGTH) {
    return null;
  }
  if (raw[FRAME_33_LENGTH - 1] === REJECT_TRAILER) {
    return 'reject';
  }
  if (raw[FRAME_33_LENGTH - 1] === NEW_PROTOCOL_TRAILER) {
    return 'new-protocol';
  }
  return null;
}

export class UnsupportedProtocolFrameError extends Error {
  constructor(public readonly trailer: 'reject' | 'new-protocol') {
    super(`gateway answered with a ${trailer} frame`);
  }
}

export interface GatewayProtocol {
  readonly name: string;
  encrypt(plaintext: string): Buffer;
  decrypt(raw: Buffer): string;
}

const CBC_IV = Buffer.from([0x88, 0xa6, 0xb0, 0x79, 0x5d, 0x85, 0xdb, 0xfc, 0xe6, 0xe0, 0xb3, 0xe9, 0xa6, 0x29, 0x65, 0x4b]);

// Original firmware: AES-256-CBC, key = MD5("Salus-<euid>") + 16 zero bytes, fixed IV.
// Some intermediate firmware versions use AES-128-CBC with just the 16-byte MD5 key.
export class AesCbcProtocol implements GatewayProtocol {
  public readonly name: string;
  private key: Buffer;
  private cipher_alg: string;

  constructor(eu_id: string, aes128 = false) {
    const md5Key = crypto.createHash('md5').update(`Salus-${eu_id.toLowerCase()}`).digest();
    this.key = aes128 ? md5Key : Buffer.concat([md5Key, Buffer.alloc(16)]);
    this.cipher_alg = aes128 ? 'aes-128-cbc' : 'aes-256-cbc';
    this.name = aes128 ? 'AES-128-CBC' : 'AES-256-CBC';
  }

  encrypt(msg: string): Buffer {
    const cipher = crypto.createCipheriv(this.cipher_alg, this.key, CBC_IV);
    cipher.setAutoPadding(false);
    const paddedData = pkcs7.pad(Buffer.from(msg));
    //no cipher.final(), otherwise it does not work anymore
    return cipher.update(paddedData);
  }

  decrypt(raw: Buffer): string {
    // drop any trailer that is not block aligned
    const cipherBytes = raw.subarray(0, raw.length - (raw.length % 16));
    const decipher = crypto.createDecipheriv(this.cipher_alg, this.key, CBC_IV);
    const result = Buffer.concat([decipher.update(cipherBytes), decipher.final()]);
    return result.toString('utf8');
  }
}

const CCM_KEY_SUFFIX = Buffer.from('9a4ba190ac2b5139b32c3528', 'ascii');
const CCM_MAC_SIZE = 8;
const CCM_NONCE_SIZE = 8;

// New firmware (UG800 and updated UG600): AES-256-CCM, reverse engineered by
// https://github.com/leonardpitzu/homeassistant_salus
//   key   = hex-decoded EUID (8 bytes) + 24 byte hardcoded ASCII suffix
//   nonce = 3 random bytes + 2 byte BE counter + 3 byte BE truncated epoch seconds
//   wire  = [ciphertext + 8 byte MAC][8 byte nonce], no AAD
export class AesCcmProtocol implements GatewayProtocol {
  public readonly name = 'AES-256-CCM';
  private key: Buffer;
  private counter = 0;

  constructor(eu_id: string) {
    const euid = eu_id.trim();
    if (!/^([0-9a-fA-F]{2})+$/.test(euid)) {
      throw new Error(`eu_id '${eu_id}' is not a hex string`);
    }
    let euidBytes = Buffer.from(euid, 'hex');
    if (euidBytes.length === 12) {
      euidBytes = Buffer.concat([euidBytes.subarray(0, 3), Buffer.from([0x09, 0x02]), euidBytes.subarray(3)]);
    }
    this.key = Buffer.concat([euidBytes, CCM_KEY_SUFFIX]);
    if (this.key.length !== 32) {
      throw new Error(`eu_id '${eu_id}' has an unexpected length for AES-256-CCM`);
    }
  }

  buildNonce(): Buffer {
    const nonce = Buffer.alloc(CCM_NONCE_SIZE);
    crypto.randomBytes(3).copy(nonce, 0);
    nonce.writeUInt16BE(this.counter, 3);
    nonce.writeUIntBE(Math.floor(Date.now() / 1000) & 0xffffff, 5, 3);
    this.counter = (this.counter + 1) & 0xffff;
    return nonce;
  }

  encrypt(msg: string, nonce: Buffer = this.buildNonce()): Buffer {
    const cipher = crypto.createCipheriv('aes-256-ccm', this.key, nonce, { authTagLength: CCM_MAC_SIZE });
    const plaintext = Buffer.from(msg);
    const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    return Buffer.concat([encrypted, cipher.getAuthTag(), nonce]);
  }

  decrypt(raw: Buffer): string {
    if (raw.length <= CCM_NONCE_SIZE + CCM_MAC_SIZE) {
      throw new Error(`response too short for AES-256-CCM (${raw.length} bytes)`);
    }
    const nonce = raw.subarray(raw.length - CCM_NONCE_SIZE);
    const tag = raw.subarray(raw.length - CCM_NONCE_SIZE - CCM_MAC_SIZE, raw.length - CCM_NONCE_SIZE);
    const ciphertext = raw.subarray(0, raw.length - CCM_NONCE_SIZE - CCM_MAC_SIZE);
    const decipher = crypto.createDecipheriv('aes-256-ccm', this.key, nonce, { authTagLength: CCM_MAC_SIZE });
    decipher.setAuthTag(tag);
    const result = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return result.toString('utf8');
  }
}

// Order matters: legacy protocols first, so existing setups keep working unchanged.
export function getCandidateProtocols(eu_id: string): GatewayProtocol[] {
  const candidates: GatewayProtocol[] = [new AesCbcProtocol(eu_id), new AesCbcProtocol(eu_id, true)];
  try {
    candidates.push(new AesCcmProtocol(eu_id));
  } catch {
    // eu_id can't be used as a CCM key, only the legacy protocols are possible
  }
  return candidates;
}
