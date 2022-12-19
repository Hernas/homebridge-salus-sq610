import axios from 'axios';
import { Logger } from 'homebridge';
import { SalusProperty } from './SalusProperty';

const baseUrl = 'https://eu.salusconnect.io/';

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
        [Props.State]: parsedProps[makeProp(Props.State)],
        [Props.UpdateTargetTemperature]: parsedProps[makeProp(Props.UpdateTargetTemperature)],
        [Props.UpdateState]: parsedProps[makeProp(Props.UpdateState)],
        [Props.SystemMode]: parsedProps[makeProp(Props.SystemMode)],
    }
}

export enum Props {
    Temperature = 'LocalTemperature_x100',
    Humidity = 'SunnySetpoint_x100',
    HeatingSetpoint = 'HeatingSetpoint_x100',
    CoolingSetpoint = 'CoolingSetpoint_x100',
    RunningState = 'RunningState',
    State = 'HoldType',
    UpdateTargetTemperature = 'SetHeatingSetpoint_x100',
    UpdateState = 'SetHoldType',
    SystemMode = 'SystemMode'
}

export enum State {
    StandBy = 7,
    Hold = 2,
    Auto = 0
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
    this.thermostatModels = thermostatModels.map((e) => {
      return e.toUpperCase().replace(/^VS(10|20)\w+/, 'IT600THERMHW');
    });
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

  async login() {
    const response = await axios.post(this.buildUrl('users/sign_in'), { user: { email: this.username, password: this.password } });
    if (response.status !== 200) {
      throw Error(`Wrong status code[${response.status}]`);
    }

    const token = response.data.access_token;
    if (!token) {
      throw new Error('Could not get token from login');
    }
    return token;
  }

  async getDevices() {
    const token = await this.getToken();
    const response = await axios.get(this.buildUrl('apiv1/devices'), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error(`Wrong response status[${response.status}] for getDevices`);
    }
    const allDevices = response.data;


    const result: DeviceWithProps[] = [];
    for (const e of allDevices) {
      const device = e.device;
      if (this.thermostatModels.includes(device.oem_model.toUpperCase())) {
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
  }

  async getProperty({ id, prop }: { id: string; prop: Props }): Promise<any> {
    const token = await this.getToken();
    const response = await axios(this.buildUrl(`apiv1/dsns/${id}/properties/${makeProp(prop)}`), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async getAllProperties({ id }: { id: string }): Promise<SalusProperty[]> {
    const token = await this.getToken();
    const response = await axios(this.buildUrl(`apiv1/dsns/${id}/properties`), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data.map(data => data.property) as SalusProperty[];
  }

  async setProperty({ id, prop, value }: { id: string; prop: Props; value: any }) {
    const token = await this.getToken();
    const response = await axios(this.buildUrl(`apiv1/dsns/${id}/properties/${makeProp(prop)}/datapoints`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify({ 'datapoint': { value } }),
    });
    return response.data;
  }

  buildUrl(url: string) {
    return `${baseUrl}${url}.json?timestamp=${new Date().getTime()}`;
  }
}