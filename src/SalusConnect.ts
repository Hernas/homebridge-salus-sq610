import axios from 'axios';
import { CharacteristicValue, Logger } from 'homebridge';
import { SalusProperty } from './SalusProperty';

const baseUrl = 'https://us.salusconnect.io/';

function makeProp(prop: Props) {
  return `ep_9:sIT600TH:${prop}`;
}

export function getKnownProperty(props: SalusProperty[], prop: Props): SalusProperty | undefined {
  return props.find(p => p.name === makeProp(prop));
}

export function getKnownProperties(props: SalusProperty[]): Record<Props, SalusProperty | undefined> {
  const parsedProps: Record<string, SalusProperty> = {};
  props.forEach(prop => {
    parsedProps[prop.name] = prop;
  });
  return {
    [Props.Temperature]: parsedProps[makeProp(Props.Temperature)],
    [Props.Humidity]: parsedProps[makeProp(Props.Humidity)],
    [Props.HeatingSetpoint]: parsedProps[makeProp(Props.HeatingSetpoint)],
    [Props.CoolingSetpoint]: parsedProps[makeProp(Props.CoolingSetpoint)],
    [Props.RunningState]: parsedProps[makeProp(Props.RunningState)],
    [Props.HoldType]: parsedProps[makeProp(Props.HoldType)],
    [Props.SetHeatingSetpoint]: parsedProps[makeProp(Props.SetHeatingSetpoint)],
    [Props.SetCoolingSetpoint]: parsedProps[makeProp(Props.SetCoolingSetpoint)],
    [Props.SetHoldType]: parsedProps[makeProp(Props.SetHoldType)],
    [Props.SystemMode]: parsedProps[makeProp(Props.SystemMode)],
    [Props.SetAutoHeatingSetpoint]: parsedProps[makeProp(Props.SetAutoHeatingSetpoint)],
    [Props.SetAutoCoolingSetpoint]: parsedProps[makeProp(Props.SetAutoCoolingSetpoint)],
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
  SystemMode = 'SystemMode'
}

export class Token {
  public token: string;
  public creationDay: number;
  constructor({ token, creationDay }: { token: string; creationDay: number }) {
    this.token = token;
    this.creationDay = creationDay;
  }
}


export class DeviceWithProps {
  public readonly id: string;
  public readonly name: string;
  public readonly model: string;
  public readonly props: SalusProperty[];

  constructor(id: string, name: string, model: string, props: SalusProperty[]) {
    this.id = id;
    this.name = name;
    this.model = model;
    this.props = props;
  }
}

export class SalusConnect {

  private username: string;
  private password: string;
  private thermostatModels: string[];
  private token: Token | undefined;
  private log?: Logger;

  constructor(
    { username, password, thermostatModels = [], log }:
      { username: string; password: string; thermostatModels: string[]; log?: Logger },
  ) {
    this.username = username;
    this.password = password;
    this.log = log;
    this.thermostatModels = thermostatModels;
  }

  async getToken(): Promise<string> {
    if (this.token) {
      return this.token.token;
    }
    const tokenString = await this.login();
    const token = new Token({ token: tokenString, creationDay: new Date().getDate() });
    this.token = token;
    return token.token;
  }

  async refreshToken() {
    this.log?.info('Got 401, refreshing token...');
    this.token = undefined;
    return await this.getToken();
  }

  async login() {
    const response = await axios.post(this.buildUrl('users/sign_in'), { user: { email: this.username, password: this.password } });
    const token = response.data.access_token;
    if (!token) {
      throw new Error('Could not get token from login');
    }
    return token;
  }

  isCorrectDevice(device: {oem_model: string}) {
    const modelName = device.oem_model.toUpperCase();
    this.log?.debug(`Checking if model[${modelName}] is supported...`);
    return this.thermostatModels.some((model) => {
      return modelName.includes(model);
    });
  }

  async getDevices(retried = false) {
    const token = await this.getToken();
    try {
      const response = await axios.get(this.buildUrl('apiv1/devices'), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const allDevices = response.data;

      const result: DeviceWithProps[] = [];
      for (const e of allDevices) {
        const device = e.device;
        if (this.isCorrectDevice(device)) {
          result.push(
            new DeviceWithProps(
              device.dsn,
              device.product_name,
              device.oem_model,
              await this.getAllProperties({ id: device.dsn }),
            ),
          );
        }
      }
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (!retried && status === 401) {
          await this.refreshToken();
          return this.getDevices(true);
        }
        throw new Error(`Wrong response status[${status}] for getDevices`);
      }
      throw error;
    }
  }

  async getProperty({ id, prop, retried }: { id: string; prop: Props; retried?: boolean }): Promise<SalusProperty> {
    const token = await this.getToken();
    try {
      const response = await axios(this.buildUrl(`apiv1/dsns/${id}/properties/${makeProp(prop)}`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (!retried && status === 401) {
          await this.refreshToken();
          return this.getProperty({ id, prop, retried: true });
        }
        throw new Error(`'Wrong response on getProperty(${JSON.stringify({ id, prop })}): ${error.response?.data}'`);
      }
      throw error;
    }
  }

  async getAllProperties({ id, retried }: { id: string; retried?: boolean }): Promise<SalusProperty[]> {
    const token = await this.getToken();
    try {
      const response = await axios(this.buildUrl(`apiv1/dsns/${id}/properties`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data.map(data => data.property) as SalusProperty[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (!retried && status === 401) {
          await this.refreshToken();
          return this.getAllProperties({ id, retried: true });
        }
        throw new Error(`'Wrong response on getAllProperties(${JSON.stringify({ id })}): ${error.response?.data}'`);
      }
      throw error;
    }
  }

  async setProperty({ id, prop, value, retried }: { id: string; prop: Props; value: CharacteristicValue; retried?: boolean }):
    Promise<{ value: CharacteristicValue }> {
    const token = await this.getToken();
    try {

      const response = await axios.post(this.buildUrl(`apiv1/dsns/${id}/properties/${makeProp(prop)}/datapoints`),
        { 'datapoint': { value } }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      this.log?.debug(`Response: ${JSON.stringify(response.data, undefined, 4)}`);
      return response.data.datapoint;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (!retried && status === 401) {
          await this.refreshToken();
          return this.setProperty({ id, prop, value, retried: true });
        }
        throw new Error(`'Wrong response on setProperty(${JSON.stringify({ id, prop, value })}): ${error.response?.data}'`);
      }
      throw error;
    }
  }

  buildUrl(url: string) {
    return `${baseUrl}${url}.json?timestamp=${new Date().getTime()}`;
  }
}
