import { Props, SalusConnect } from '../SalusConnect';
import nock from 'nock';
import fs from 'fs';

const ip_address:string = '192.168.0.111';
const eu_id:string = '0000000000000000';
const thermostatModels = ['SQ610', 'IT600THERM'];

const responseBytes = fs.readFileSync('./src/__tests__/gw_response');

const salus = new SalusConnect({ip_address:ip_address, eu_id: eu_id, thermostatModels:thermostatModels});

describe('SalusConnect', () => {
  beforeEach(() => {
    nock(`http://${ip_address}:80`)
      .post('/deviceid/read')
      .reply(200, Buffer.from(responseBytes));
  })
  it('should load devices', async () => {
    const devices = await salus.getDevices();
    expect(devices.length).toBe(10);
  });
  it('Check some data', async () => {
    const devices = await salus.getDevices();
    expect(devices[0].device.deviceName).toBe('Bad');
  });
  it('Check values', async () => {
    const devices = await salus.getDevices();
    expect(devices[0].props[Props.Temperature]).toBe(2000);
    expect(devices[0].props[Props.Humidity]).toBe(53);
  });

});