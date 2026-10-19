import { AesCbcProtocol, AesCcmProtocol, getFrame33Trailer } from '../GatewayProtocol';
import { SalusConnect } from '../SalusConnect';
import http from 'http';
import { AddressInfo } from 'net';

const eu_id:string = '001e5e0902abcdef';
const thermostatModels = ['SQ610', 'IT600THERM'];

const readallResponse = {
  status: 'success',
  id: [{
    data: { UniID: 'abc', Endpoint: 1, DeviceType: 1 },
    sIT600TH: { LocalTemperature_x100: 2150, DeviceName: '{"deviceName":"Living"}' },
    sBasicS: { ModelIdentifier: 'SQ610RF' },
  }],
};

// reject frame as sent by new firmware gateways to requests using an unsupported protocol
const rejectFrame = Buffer.concat([Buffer.alloc(28, 0x11), Buffer.from([0x01, 0xaa, 0xbb, 0xcc, 0xae])]);

describe('AesCcmProtocol', () => {
  it('matches the python reference implementation', () => {
    // generated with cryptography's AESCCM, key/nonce derived as in leonardpitzu/homeassistant_salus
    const expected = Buffer.from('6b3ca8373fee53859913083d074911d62729295a37d5aa2c812d22a21ff473b66ca1b2c3000565f0e1', 'hex');
    const ccm = new AesCcmProtocol(eu_id);
    expect(ccm.encrypt('{"requestAttr":"readall"}', Buffer.from('a1b2c3000565f0e1', 'hex'))).toEqual(expected);
    expect(ccm.decrypt(expected)).toBe('{"requestAttr":"readall"}');
  });

  it('builds nonces with an increasing counter', () => {
    const ccm = new AesCcmProtocol(eu_id);
    expect(ccm.buildNonce().readUInt16BE(3)).toBe(0);
    expect(ccm.buildNonce().readUInt16BE(3)).toBe(1);
  });

  it('rejects tampered data', () => {
    const ccm = new AesCcmProtocol(eu_id);
    const encrypted = ccm.encrypt('hello');
    encrypted[0] ^= 0xff;
    expect(() => ccm.decrypt(encrypted)).toThrow();
  });

  it('rejects an eu_id that is not hex', () => {
    expect(() => new AesCcmProtocol('not-an-euid')).toThrow();
  });
});

describe('AesCbcProtocol', () => {
  it('round trips with AES-256 and AES-128', () => {
    for (const cbc of [new AesCbcProtocol(eu_id), new AesCbcProtocol(eu_id, true)]) {
      expect(cbc.decrypt(cbc.encrypt('{"requestAttr":"readall"}'))).toBe('{"requestAttr":"readall"}');
    }
  });
});

describe('getFrame33Trailer', () => {
  it('detects reject and new protocol frames', () => {
    expect(getFrame33Trailer(rejectFrame)).toBe('reject');
    const newProtocolFrame = Buffer.from(rejectFrame);
    newProtocolFrame[32] = 0xaf;
    expect(getFrame33Trailer(newProtocolFrame)).toBe('new-protocol');
    expect(getFrame33Trailer(Buffer.alloc(32))).toBeNull();
  });
});

// nock can't intercept these as it tries to parse the binary request body as JSON
function startGateway(handler: (body: Buffer) => Buffer): Promise<{ server: http.Server; salus: SalusConnect }> {
  const server = http.createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => res.end(handler(Buffer.concat(chunks))));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => {
    const salus = new SalusConnect({ip_address: '127.0.0.1', eu_id, thermostatModels});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (salus as any).port = (server.address() as AddressInfo).port;
    resolve({ server, salus });
  }));
}

describe('SalusConnect protocol detection', () => {
  let server: http.Server | undefined;
  afterEach(() => server?.close());

  it('falls back to AES-256-CCM on new firmware', async () => {
    const ccm = new AesCcmProtocol(eu_id);
    const requests: string[] = [];
    const gateway = await startGateway((body) => {
      try {
        requests.push(ccm.decrypt(body));
        return ccm.encrypt(JSON.stringify(readallResponse));
      } catch {
        requests.push('legacy');
        return rejectFrame;
      }
    });
    server = gateway.server;

    const devices = await gateway.salus.getDevices();
    expect(devices.length).toBe(1);
    expect(devices[0].device.deviceName).toBe('Living');
    // AES-256-CBC and AES-128-CBC rejected, the CCM detection response is reused
    expect(requests).toEqual(['legacy', 'legacy', '{"requestAttr":"readall"}']);

    // detected protocol is kept for subsequent requests
    await gateway.salus.getDevices();
    expect(requests).toEqual(['legacy', 'legacy', '{"requestAttr":"readall"}', '{"requestAttr":"readall"}']);
  });

  it('reports a helpful error when no protocol works', async () => {
    const gateway = await startGateway(() => rejectFrame);
    server = gateway.server;
    await expect(gateway.salus.getDevices()).rejects.toThrow(/real eu_id/);
  });
});
