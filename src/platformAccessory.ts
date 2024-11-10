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
      .setCharacteristic(this.platform.Characteristic.Model, this.device.device.modelIdentifier)
      .setCharacteristic(this.platform.Characteristic.SerialNumber, this.accessory.UUID);

    this.service = this.accessory.getService('Thermostat')
      || this.accessory.addService(this.platform.Service.Thermostat, 'Thermostat', 'thermostat');

    this.service.setCharacteristic(this.platform.Characteristic.Name, this.device.device.deviceName);
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
    this.service.getCharacteristic(this.platform.Characteristic.TargetHeatingCoolingState).setProps({
      validValues: [this.platform.Characteristic.TargetHeatingCoolingState.OFF,
        this.platform.Characteristic.TargetHeatingCoolingState.HEAT],
    })
      .onSet(this.onTargetHeatingCoolingStateSet.bind(this));
    this.updateValues(this.device.props);
    this.refreshTimeout();
  }

  async onTargetHeatingCoolingStateSet(value: CharacteristicValue) {
    this.platform.log.debug(`onTargetHeatingCoolingStateSet: ${value}`);

    /**
     *         if device.model == 'FC600':
            request_data = { "sTherS": { "SetSystemMode": 4 if mode == HVAC_MODE_HEAT
            else 3 if mode == HVAC_MODE_COOL else HVAC_MODE_AUTO } }
        else:
            request_data = { "sIT600TH": { "SetHoldType": 7 if mode == HVAC_MODE_OFF else 0 } }


            request_data = { "sIT600TH": { "SetHoldType": 7 if preset == PRESET_OFF else 2 if preset == PRESET_PERMANENT_HOLD else 0 } }
     */
    try {
      let val = 0;
      switch (value) {
        // case this.platform.Characteristic.TargetHeatingCoolingState.AUTO:
        //   val = SystemMode.Auto;
        //   break;
        // case this.platform.Characteristic.TargetHeatingCoolingState.COOL:
        //   val = SystemMode.Cool;
        //   break;
        case this.platform.Characteristic.TargetHeatingCoolingState.HEAT:
          val = HoldType.Auto;
          break;
        case this.platform.Characteristic.TargetHeatingCoolingState.OFF:
          val = HoldType.StandBy;
          break;
      }

      // const props = (() => {

      //   }
      // })();
      await this.salusConnect.setProperty(this.device.device, Props.SetHoldType, val as number);
    } catch (e) {
      this.platform.log.error(`${e}`);
    }
  }

  async onTargetTemperatureSet(value: CharacteristicValue) {
    try {
      const props = (() => {
        switch (this.latestKnownProps.SystemMode) {
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
      value = Math.round(Number(value)*2)/2;
      await Promise.all(props.map(prop => this.salusConnect.setProperty(this.device.device, prop, value as number * 100 )));
    } catch (e) {
      this.platform.log.error(`${e}`);
    }
  }

  updateValues(allProps: typeof this.device.props) {

    const props = getKnownProperties(allProps);
    this.latestKnownProps = props;
    const simplerProps = {};
    this.platform.log.debug(`In updateValues props: ${JSON.stringify(props)}`);
    Object.keys(props).forEach(key => {
      //simplerProps[key] = props[key].value;
      simplerProps[key] = props[key];
    });
    this.platform.log.debug(
      `Updating values [${this.device.device.deviceName}]\n${JSON.stringify(simplerProps, undefined, 4)}`,
    );
    const holdType = props.HoldType as HoldType | undefined;
    // Current
    if (props.LocalTemperature_x100) {
      this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
        .updateValue(parseInt(`${props.LocalTemperature_x100}`) / 100);
    }
    if (props.RunningState) {
      const state = (() => {
        if (holdType === HoldType.StandBy) {
          return this.platform.Characteristic.CurrentHeatingCoolingState.OFF;
        }
        switch (props.RunningState as RunningState) {
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
        .updateValue(props.SunnySetpoint_x100);
    }

    // Target
    if (props.HeatingSetpoint_x100) {
      this.service.getCharacteristic(this.platform.Characteristic.TargetTemperature)
        .updateValue(parseInt(`${props.HeatingSetpoint_x100}`) / 100);
    }
    if (props.SystemMode) {
      const state = (() => {
        if (holdType === HoldType.StandBy) {
          return this.platform.Characteristic.CurrentHeatingCoolingState.OFF;
        }
        switch (props.SystemMode as SystemMode) {
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
      this.updateValues(await this.salusConnect.getAllProperties(this.device.device));
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
