import { SalusConnect } from '../SalusConnect';
const salus = new SalusConnect({
  username: process.env.SALUS_USERNAME as string,
  password: process.env.SALUS_PASSWORD as string,
  thermostatModels:['SQ610'],
});

describe('SalusConnect', () => {
  it('should load devices', async () => {
    const devices = await salus.getDevices();
    if(!devices) {
      throw new Error('No devices');
    }
    devices.forEach((device) => {
      console.log(JSON.stringify(device));
    });
  });
});