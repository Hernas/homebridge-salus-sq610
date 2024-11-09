import { SalusConnect } from '../SalusConnect';
const salus = new SalusConnect({ip_address:'', eu_id:'',

  thermostatModels:['SQ610'],
});

describe('SalusConnect', () => {
  it.skip('should load devices', async () => {
    const devices = await salus.getDevices();
    if(!devices) {
      throw new Error('No devices');
    }
    devices.forEach((device) => {
      console.log(JSON.stringify(device));
    });
  });
});