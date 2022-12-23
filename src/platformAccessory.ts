import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { HoldType, RunningState, SystemMode } from './consts';

import { SalusSQ610HomebridgePlatform } from './platform';
import { DeviceWithProps, getKnownProperties, Props, SalusConnect } from './SalusConnect';

export class SalusSQ610Accessory {
  private service: Service;

  private device: DeviceWithProps;
  private latestKnownProps: ReturnType<typeof getKnownProperties>;
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  constructor(
    private readonly platform: SalusSQ610HomebridgePlatform,
    private readonly accessory: PlatformAccessory,
    private readonly salusConnect: SalusConnect,
  ) {
    this.device = this.accessory.context.device;
    this.latestKnownProps = getKnownProperties(this.device.props);
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Salus')
      .setCharacteristic(this.platform.Characteristic.Model, this.device.model)
      .setCharacteristic(this.platform.Characteristic.SerialNumber, this.accessory.UUID);

    this.service = this.accessory.getService('Thermostat')
      || this.accessory.addService(this.platform.Service.Thermostat, 'Thermostat', 'thermostat');

    this.service.setCharacteristic(this.platform.Characteristic.Name, this.device.name);
    this.service.getCharacteristic(this.platform.Characteristic.TemperatureDisplayUnits)
      .updateValue(this.platform.Characteristic.TemperatureDisplayUnits.CELSIUS);
    this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature).setProps({
      minValue: -100,
      maxValue: 100,
      minStep: 0.1,
    });
    this.service.getCharacteristic(this.platform.Characteristic.TargetTemperature).setProps({
      minValue: 0,
      maxValue: 40,
      minStep: 0.5,
    }).onSet(this.onTargetTemperatureSet.bind(this));
    this.updateValues(this.device.props);
    this.refreshTimeout();
  }

  async onTargetTemperatureSet(value: CharacteristicValue) {
    try {
      const props = (() => {
        switch (this.latestKnownProps.SystemMode?.value) {
          case SystemMode.Cool:
            return [Props.SetCoolingSetpoint];
          case SystemMode.Heat:
          case SystemMode.EmergencyHeating:
            return [Props.SetHeatingSetpoint];
          case SystemMode.Auto:
            return [Props.SetAutoCoolingSetpoint, Props.SetAutoHeatingSetpoint];
          case SystemMode.Off:
          default:
            return [];
        }
      })();
      await Promise.all(props.map(prop => this.salusConnect.setProperty({ id: this.device.id, prop, value: value as number * 100 })));
    } catch (e) {
      this.platform.log.error(`${e}`);
    }
  }

  updateValues(allProps: typeof this.device.props) {
    const props = getKnownProperties(allProps);
    this.latestKnownProps = props;
    const simplerProps = {};
    Object.keys(props).forEach(key => {
      simplerProps[key] = props[key].value;
    });
    this.platform.log.debug(
      `Updating values [${this.device.name}]\n${JSON.stringify(simplerProps, undefined, 4)}`,
    );
    const holdType = props.HoldType?.value as HoldType | undefined;
    // Current
    if (props.LocalTemperature_x100) {
      this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
        .updateValue(parseInt(`${props.LocalTemperature_x100.value}`) / 100);
    }
    if (props.RunningState) {
      const state = (() => {
        if (holdType === HoldType.StandBy) {
          return this.platform.Characteristic.CurrentHeatingCoolingState.OFF;
        }
        switch (props.RunningState?.value as RunningState) {
          case RunningState.Heat:
            return this.platform.Characteristic.CurrentHeatingCoolingState.HEAT;
          case RunningState.Cool:
            return this.platform.Characteristic.CurrentHeatingCoolingState.COOL;
          case RunningState.Off:
          default:
            return this.platform.Characteristic.CurrentHeatingCoolingState.OFF;
        }
      })();
      this.service.getCharacteristic(this.platform.Characteristic.CurrentHeatingCoolingState).updateValue(state);
    }
    if (props.SunnySetpoint_x100) {
      this.service.getCharacteristic(this.platform.Characteristic.CurrentRelativeHumidity)
        .updateValue(props.SunnySetpoint_x100.value);
    }

    // Target
    if (props.HeatingSetpoint_x100) {
      this.service.getCharacteristic(this.platform.Characteristic.TargetTemperature)
        .updateValue(parseInt(`${props.HeatingSetpoint_x100.value}`) / 100);
    }
    if (props.SystemMode) {
      const state = (() => {
        if (holdType === HoldType.StandBy) {
          return this.platform.Characteristic.CurrentHeatingCoolingState.OFF;
        }
        switch (props.SystemMode?.value as SystemMode) {
          case SystemMode.Auto:
            return this.platform.Characteristic.TargetHeatingCoolingState.AUTO;
          case SystemMode.Cool:
            return this.platform.Characteristic.TargetHeatingCoolingState.COOL;
          case SystemMode.EmergencyHeating:
          case SystemMode.Heat:
            return this.platform.Characteristic.TargetHeatingCoolingState.HEAT;
          case SystemMode.Off:
          default:
            return this.platform.Characteristic.TargetHeatingCoolingState.OFF;
        }
      })();
      this.service.getCharacteristic(this.platform.Characteristic.TargetHeatingCoolingState).updateValue(state);
    }
  }

  async refreshValues() {
    try {
      this.updateValues(await this.salusConnect.getAllProperties({ id: this.device.id }));
    } catch (e) {
      this.platform.log.error(`${e}`);
    } finally {
      this.refreshTimeout();
    }
  }

  private refreshTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    const timeout = (this.platform.config.refreshTime ?? 15) * 1000;
    this.timeoutId = setTimeout(() => {
      this.refreshValues();
    }, timeout);
  }
}
