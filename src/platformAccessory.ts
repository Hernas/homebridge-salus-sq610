import { Service, PlatformAccessory } from 'homebridge';

import { SalusSQ610HomebridgePlatform } from './platform';
import { DeviceWithProps, getKnownProperties, SalusConnect } from './SalusConnect';

export class SalusSQ610Accessory {
  private service: Service;

  private device: DeviceWithProps;
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  constructor(
    private readonly platform: SalusSQ610HomebridgePlatform,
    private readonly accessory: PlatformAccessory,
    private readonly salusConnect: SalusConnect,
  ) {
    this.device = this.accessory.context.device;
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Salus')
      .setCharacteristic(this.platform.Characteristic.Model, this.device.model)
      .setCharacteristic(this.platform.Characteristic.SerialNumber, this.accessory.UUID);

    // FLOOR
    this.service = this.accessory.getService('Thermostat')
      || this.accessory.addService(this.platform.Service.Thermostat, 'Thermostat', 'thermostat');

    this.service.setCharacteristic(this.platform.Characteristic.Name, this.device.name);
    this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature).setProps({
      minValue: -100,
      maxValue: 100,
      minStep: 0.1,
    });
    this.updateValues(this.device.props);
    this.refreshTimeout();
  }

  updateValues(allProps: typeof this.device.props) {
    const props = getKnownProperties(allProps);
    this.platform.log.debug(`Updating values: ${JSON.stringify(props, undefined, 4)}`);
    if(props.LocalTemperature_x100) {
      this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature).updateValue(props.LocalTemperature_x100.value / 100);
    }
  }

  async refreshValues() {
    try {
      this.updateValues(await this.salusConnect.getAllProperties({id: this.device.id}));
    } catch(e) {
      this.platform.log.error(`${e}`);
    } finally {
      this.refreshTimeout();
    }
  }

  private refreshTimeout() {
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    const timeout = (this.platform.config.refreshTime ?? 15) * 1000;
    this.timeoutId = setTimeout(() => {
      this.refreshValues();
    }, timeout);
  }
}
