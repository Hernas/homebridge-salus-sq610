import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';

import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import { SalusSQ610Accessory } from './platformAccessory';
import { DeviceWithProps, SalusConnect } from './SalusConnect';

/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
export class SalusSQ610HomebridgePlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  private readonly ip_address: string;
  private readonly eu_id: string;
  private readonly thermostatModels: string[];

  // this is used to track restored cached accessories
  public readonly accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.debug('Finished initializing platform:', this.config.name);
    this.ip_address = this.config.ip_address;
    this.eu_id = this.config.eu_id;
    this.thermostatModels = ['SQ610', 'IT600THERM'];

    this.api.on('didFinishLaunching', () => {
      this.discoverDevices();
    });
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  async discoverDevices() {
    if(!this.ip_address) {
      this.log.error('Missing ip address, please configure the plugin correctly.');
      return;
    }
    const salusConnect = new SalusConnect({
      ip_address: this.ip_address,
      eu_id: this.eu_id,
      log: this.log,
      thermostatModels: this.thermostatModels,
    });

    let devices:DeviceWithProps[] = [];
    try {
      devices = await salusConnect.getDevices();
    } catch(e) {
      this.log.error(`Could not load the devices: ${e}`);
      if(e instanceof Error) {
        this.log.error(`Could not load the devices: ${e.stack}`);
      }
      this.log.info('Trying to fetch devices again in 60s...');
      setTimeout(() => {
        this.discoverDevices();
      }, 60000);
    }
    for (const device of devices) {

      const uuid = this.api.hap.uuid.generate(device.device.uniID);
      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      if (existingAccessory) {
        this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
        existingAccessory.context.device = device;
        this.api.updatePlatformAccessories([existingAccessory]);
        new SalusSQ610Accessory(this, existingAccessory, salusConnect);
      } else {
        this.log.info('Adding new accessory:', device.device.deviceName);
        const accessory = new this.api.platformAccessory(device.device.deviceName, uuid);
        accessory.context.device = device;
        new SalusSQ610Accessory(this, accessory, salusConnect);
        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
      }
    }
  }
}
