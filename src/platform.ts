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

  private readonly email: string;
  private readonly password: string;
  private readonly thermostatModels: string[];

  // this is used to track restored cached accessories
  public readonly accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.debug('Finished initializing platform:', this.config.name);
    this.email = this.config.email;
    this.password = this.config.password;
    this.thermostatModels = this.config.thermostatModels;
    
    this.api.on('didFinishLaunching', () => {
      this.discoverDevices();
    });
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  async discoverDevices() {
    if(!this.email || !this.password) {
      return;
    }
    const salusConnect = new SalusConnect({
      username: this.email, 
      password: this.password, 
      log: this.log, 
      thermostatModels: ['SQ610', 'SQ610RF']
    });

    let devices:DeviceWithProps[] = [];
    try {
      devices = await salusConnect.getDevices();
    } catch(e) {
      this.log.error(`Could not load the devices: ${e}`);
    }
    for (const device of devices) {

      const uuid = this.api.hap.uuid.generate(device.id);
      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      if (existingAccessory) {
        this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
        existingAccessory.context.device = device;
        this.api.updatePlatformAccessories([existingAccessory]);
        new SalusSQ610Accessory(this, existingAccessory, salusConnect);
      } else {
        this.log.info('Adding new accessory:', device.name);
        const accessory = new this.api.platformAccessory(device.name, uuid);
        accessory.context.device = device;
        new SalusSQ610Accessory(this, accessory, salusConnect);
        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
      }
    }
  }
}
