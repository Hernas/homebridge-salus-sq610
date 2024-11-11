import axios from 'axios';
import { CharacteristicValue, Logger } from 'homebridge';
import * as crypto from 'crypto';
import * as pkcs7 from 'pkcs7-padding';
import {Mutex} from 'async-mutex';


export function getKnownProperties(props: Map<string, CharacteristicValue>): Record<Props, CharacteristicValue> {
  return {
    [Props.Temperature]: props[Props.Temperature],
    [Props.Humidity]: props[Props.Humidity],
    [Props.HeatingSetpoint]: props[Props.HeatingSetpoint],
    [Props.CoolingSetpoint]: props[Props.CoolingSetpoint],
    [Props.RunningState]: props[Props.RunningState],
    [Props.HoldType]: props[Props.HoldType],
    [Props.SetHeatingSetpoint]: props[Props.SetHeatingSetpoint],
    [Props.SetCoolingSetpoint]: props[Props.SetCoolingSetpoint],
    [Props.SetHoldType]: props[Props.SetHoldType],
    [Props.SystemMode]: props[Props.SystemMode],
    [Props.SetAutoHeatingSetpoint]: props[Props.SetAutoHeatingSetpoint],
    [Props.SetAutoCoolingSetpoint]: props[Props.SetAutoCoolingSetpoint],
    [Props.SetSystemMode]: props[Props.SetSystemMode],
  };
}

export enum Props {
  Temperature = 'LocalTemperature_x100',
  Humidity = 'SunnySetpoint_x100',
  HeatingSetpoint = 'HeatingSetpoint_x100',
  CoolingSetpoint = 'CoolingSetpoint_x100',
  RunningState = 'RunningState',
  HoldType = 'HoldType',
  SetHeatingSetpoint = 'SetHeatingSetpoint_x100',
  SetAutoHeatingSetpoint = 'SetAutoHeatingSetpoint_x100',
  SetCoolingSetpoint = 'SetCoolingSetpoint_x100',
  SetAutoCoolingSetpoint = 'SetAutoCoolingSetpoint_x100',
  SetHoldType = 'SetHoldType',
  SystemMode = 'SystemMode',
  SetSystemMode = 'SetSystemMode',
}


export class Device {
  public readonly deviceType;
  public readonly endpoint;
  public readonly uniID;
  public readonly modelIdentifier;
  public readonly deviceName;
  public readonly rawData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(deviceType: string, endpoint:number, uniID: string, modelIdentifier: string, deviceName:string, rawData:any) {
    this.deviceType = deviceType;
    this.endpoint = endpoint;
    this.uniID = uniID;
    this.modelIdentifier = modelIdentifier;
    this.deviceName = deviceName;
    this.rawData = rawData;
  }
}

export class DeviceWithProps {
  public readonly props: Map<string, CharacteristicValue>;
  public readonly device: Device;

  constructor(device: Device, props: Map<string, CharacteristicValue>) {
    this.device = device;
    this.props = props;
  }
}

export class SalusConnect {
  private host: string;
  private eu_id: string;
  private thermostatModels: string[];
  private log?: Logger;
  private port: number;
  private timeout:number;
  private encryptor: IT600Encryptor;
  private static lock: Mutex = new Mutex();

  constructor(
    { ip_address, eu_id, thermostatModels = [], log}:
      { ip_address: string; eu_id: string; thermostatModels: string[]; log?: Logger },
  ) {
    this.host = ip_address;
    this.eu_id = eu_id;
    this.log = log;
    this.thermostatModels = thermostatModels;
    this.port = 80;
    this.timeout = 5000; // ms
    this.encryptor = new IT600Encryptor(this.eu_id);
    //this.lock = new Mutex();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async makeEncryptedRequest(command:string, requestBody:any) {
    await SalusConnect.lock.acquire();

    try {
      const requestUrl = `http://${this.host}:${this.port}/deviceid/${command}`;
      const requestBodyJson = JSON.stringify(requestBody);

      //this.log?.debug(`Gateway request: POST ${requestUrl}\n${requestBodyJson}\n`);
      const data = Buffer.from(this.encryptor.encrypt(requestBodyJson));
      
      const response = await axios({
        method: 'post',
        url: requestUrl,
        data: data,
        headers: {'content-type': 'application/json' },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: this.timeout,
        responseType: 'arraybuffer',
      });

      const responseBytes = response.data;
      const responseJsonString = this.encryptor.decrypt(responseBytes);

      //this.log?.debug(`Gateway response:\n${responseJsonString}\n`);

      const responseJson = JSON.parse(responseJsonString);

      if (responseJson.status !== 'success') {
        const reprRequestBody = JSON.stringify(requestBody);
        this.log?.error(`${command} failed: ${reprRequestBody}`);
        throw new Error(`iT600 gateway rejected '${command}' command with content '${reprRequestBody}'`);
      }

      return responseJson;
    } catch (e) {
      let message:string;
      if (e instanceof Error) {
        message = e.message;
      } else {
        message = String(e);
      }
      if (axios.isAxiosError(e) && e.code === 'ECONNABORTED') {
        this.log?.error(`Timeout while connecting to gateway: ${message}`);
        throw new Error('Error occurred while communicating with iT600 gateway: timeout');
      } else if (axios.isAxiosError(e)) {
        throw new Error('Error occurred while communicating with iT600 gateway: check if you have specified host/IP address correctly');
      } else {
        this.log?.error(`Exception ${message}, ${e}`);
        throw new Error(message);
      }
    } finally {
      SalusConnect.lock.release();
    }
  }

  isCorrectDevice(device: Device) {
    const modelName = device.modelIdentifier.toUpperCase();
    //this.log?.debug(`Checking if model[${modelName}] is supported...`);
    return this.thermostatModels.some((model) => {
      return modelName.includes(model);
    });
  }

  async connect() {

    try {
      const allDevices = await this.makeEncryptedRequest('read',
        {
          'requestAttr': 'readall',
        });
      const gateway = allDevices.id.find(x => x.sGateway && x.sGateway.NetworkLANMAC && x.sGateway.NetworkLANMAC.length > 0) || null;

      if(!gateway) {
        throw new Error(
          'Error occurred while communicating with iT600 gateway: response did not contain gateway information',
        );
      }
      return gateway['sGateway']['NetworkLANMAC'];
    } catch (e) {
      this.log?.error(String(e));
      throw new Error(String(e));
    }
  }

  async getDevices(retried = false):Promise<DeviceWithProps[]> {

    try {
      const response = await this.makeEncryptedRequest('read',
        {
          'requestAttr': 'readall',
        });
      const allDevices = response.id || [];
      this.log?.debug(`retrieved ${allDevices.length} devices`);

      const result: DeviceWithProps[] = [];
      allDevices.forEach((element) => {
        //this.log?.debug(`element: ${element}`);

        // ugly, as it overrides some of the properties like deviceTyoe, but makes it easy for the relevant props
        const propslist = Object.assign({}, ...function _flatten(o) {
          return [].concat(...Object.keys(o).map(k => typeof o[k] === 'object' ? _flatten(o[k]) : ({[k]: o[k]})));
        }(element));
        let niceName:string = propslist.DeviceName;
        if(propslist.DeviceName) {
          const parsedName = JSON.parse(propslist.DeviceName);
          niceName = parsedName ? parsedName.deviceName : niceName;
          niceName = niceName.trim();
          niceName = niceName.replaceAll('/', ' ');
        }

        const device = new Device(propslist.DeviceType, propslist.Endpoint,
          propslist.UniID, propslist.ModelIdentifier, niceName, element);
        if (this.isCorrectDevice(device)) {
          result.push(
            new DeviceWithProps(device,
              this.getAllPropertiesLocal(propslist),
            ),
          );
        }
      });
      this.log?.debug(`(getDevices): Found ${result.length} supported devices`);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (!retried) {
          return this.getDevices(true);
        }
        throw new Error(`Wrong response status[${status}] for getDevices`);
      }
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllPropertiesLocal(flatPropsList:any) {
    const props:Map<string, CharacteristicValue> = new Map();
    Object.keys(flatPropsList).forEach((key) => {
      props[key] = flatPropsList[key];
    });
    return props;
  }

  async getAllProperties(device:Device, retried?: boolean): Promise<Map<string, CharacteristicValue>> {
    try {
      const response = await this.makeEncryptedRequest('read',
        {
          'requestAttr': 'deviceid',
          'id': [{
            'data': {
              'DeviceType': device.rawData.data.DeviceType,
              'Endpoint': device.rawData.data.Endpoint,
              'UniID': device.rawData.data.UniID,
            },
          }],
        });

      if(response && response.status === 'fail') {
        throw new Error(`'Wrong response on getAllProperties(${JSON.stringify({ device })}): ${response}'`);
      }

      const flatList = Object.assign({}, ...function _flatten(o) {
        return [].concat(...Object.keys(o).map(k => typeof o[k] === 'object' ? _flatten(o[k]) : ({[k]: o[k]})));
      }(response.id[0]));

      const props:Map<string, CharacteristicValue> = new Map();

      Object.keys(flatList).forEach((key) => {
        props[key] = flatList[key];
      });

      return props;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!retried) {
          return this.getAllProperties(device, true);
        }
        throw new Error(`'Wrong response on getAllProperties(${JSON.stringify({ device })}): ${error.response}'`);
      }
      throw error;
    }
  }

  async setProperty(device: Device, prop: Props, value: CharacteristicValue, retried?: boolean):
    Promise<{ value: CharacteristicValue }> {

    try {
      const response = await this.makeEncryptedRequest('write',
        {
          'requestAttr': 'write',
          'id': [{
            'data': {
              'DeviceType': device.rawData.data.DeviceType,
              'Endpoint': device.rawData.data.Endpoint,
              'UniID': device.rawData.data.UniID,
            },
            'sIT600TH': {
              [prop]: value,
            },
          }],
        });


      this.log?.debug(`Response: ${JSON.stringify(response, undefined, 4)}`);
      return {value};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!retried) {
          return this.setProperty(device, prop, value, true);
        }
        throw new Error(`'Wrong response on setProperty(${JSON.stringify(device)}): ${error.response?.data}'`);
      }
      throw error;
    }
  }
}

export class IT600Encryptor {

  private iv: Buffer;
  private key: Buffer;
  private cipher_alg: string;

  constructor(eu_id:string) {
    this.iv = Buffer.from([0x88, 0xa6, 0xb0, 0x79, 0x5d, 0x85, 0xdb, 0xfc, 0xe6, 0xe0, 0xb3, 0xe9, 0xa6, 0x29, 0x65, 0x4b]);
    this.key = Buffer.concat([crypto.createHash('md5').update(`Salus-${eu_id.toLowerCase()}`).digest(), Buffer.alloc(16)]);
    this.cipher_alg = 'aes256';
  }

  encrypt(msg) {
    const cipher = crypto.createCipheriv(this.cipher_alg, this.key, this.iv);
    cipher.setAutoPadding(false);
    const paddedData = pkcs7.pad(Buffer.from(msg));
    const result = cipher.update(paddedData);
    return result;
  }

  decrypt(cipherBytes) {
    const decipher = crypto.createDecipheriv(this.cipher_alg, this.key, this.iv);
    const result = Buffer.concat([decipher.update(cipherBytes), decipher.final()]);
    //result += decipher.final();
    return result.toString('utf8');
  }
}