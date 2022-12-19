export enum RunningState {
    Off = 0,
    Heat = 1,
    Cool = 2
}
export enum RunningMode {
    Off = 0,
    Cool = 3,
    Heat = 4
}
export enum SystemMode {
    Off = 0,
    Auto = 1,
    Cool = 3,
    Heat = 4,
    EmergencyHeating = 5,
}

export enum HoldType {
    StandBy = 7,
    Hold = 2,
    Auto = 0
}

export const consts = {
  categoryTypes: {
    CARBONMONOXIDEDETECTORS: 'carbonMonoxideDetectors',
    DOORMONITORS: 'doorMonitors',
    ENERGYMETERS: 'energyMeters',
    GATEWAYS: 'gateways',
    WATERHEATERS: 'waterHeaters',
    THERMOSTATS: 'thermostats',
    IT600THERMOSTATS: 'it600Thermostats',
    FC600S: 'fc600s',
    QUANTUMTHERMOSTATS: 'quantumThermostats',
    DIALRFTHERMOSTATS: 'dialRFThermostats',
    TRVS: 'trvs',
    SMARTPLUGS: 'smartPlugs',
    SMOKEDETECTORS: 'smokeDetectors',
    WINDOWMONITORS: 'windowMonitors',
    SMARTMOTIONSENSORS: 'smartMotionSensors',
    WIRELESSUNCONTROLLABLEDEVICES: 'wirelessUncontrollableDevices',
    WATERSHUTOFFVALVES: 'waterShutOffValves',
    SMARTRELAYS: 'smartRelays',
    ROLLERSHUTTERS: 'rollerShutters',
    LIGHTSWITCHS: 'lightSwitchs',
    WATERLEAKAGESENSORS: 'waterLeakageSensors',
    REMOTETEMPERATRUESENSORS: 'remoteTemperatureSensors',
    TEMPHUMIDSENSORS: 'remoteTemperatureSensors',
    CO2TEMPHUMIDSENSORS: 'remoteTemperatureSensors',
    ARSTOPVALVES: 'arStopValves',
    ACPHASECUTZIGBEEDIMMERS: 'acPhaseCutZigBeeDimmers',
    LIGHTS: 'lights',
    LIGHTSWITCHES: 'lightSwitches',
  },
  modelTypes: {
    CARBONMONOXIDEDETECTOR: 'carbonMonoxideDetector',
    COORDINATORDEVICE: 'coordinatorDevice',
    DOORMONITOR: 'doorMonitor',
    ENERGYMETER: 'energyMeter',
    GATEWAY: 'gateway',
    IT600BOILERRECEIVER: 'iT600BoilerReceiver',
    WATERHEATER: 'waterHeater',
    THERMOSTAT: 'thermostat',
    IT600TRV: 'iT600Trv',
    IT600WIRINGCENTER: 'iT600WiringCenter',
    IT600REPEATER: 'iT600Repeater',
    IT600THERMOSTAT: 'iT600Thermostat',
    MINISMARTPLUG: 'miniSmartPlug',
    SMARTPLUG: 'smartPlug',
    SMOKEDETECTOR: 'smokeDetector',
    WINDOWMONITOR: 'windowMonitor',
    SMARTMOTIONSENSOR: 'smartMotionSensor',
    GATEWAYNODE: 'gatewayNode',
    GENERIC: 'generic',
    FC600: 'FC600',
    QUANTUMTHERMOSTAT: 'quantumThermostat',
    DIALRFTHERMOSTAT: 'dialRFThermostat',
    CoverdButton: 'CoverdButton',
    UpDownButton: 'UpDownButton',
    WaterShutOffValve: 'WaterShutOffValve',
    SMARTRELAY: 'smartRelay',
    ROLLERSHUTTER: 'rollerShutter',
    WATERLEAKAGESENSOR: 'waterLeakageSensor',
    REMOTETEMPERATURESENSOR: 'remoteTemperatureSensor',
    TEMPHUMIDSENSOR: 'TempHumidSensor',
    CO2TEMPHUMIDSENSOR: 'CO2TempHumidSensor',
    ARSTOPVALVE: 'ArStopValve',
    AWC_Z: 'AWC_Z',
    ACPHASECUTZIGBEEDIMMER: 'ACPhaseCutZigBeeDimmer',
    LIGHT: 'light',
    LIGHTSWITCH: 'lightSwitch',
  },
  migrationStatus: {
    NOT_STARTED: 'not_started',
    STARTED: 'started',
    FAILED: 'failed',
    FINISHED: 'finished',
  },
  thermostatModeTypes: {
    OFF: 0,
    AUTO: 1,
    COOL: 3,
    HEAT: 4,
    EMERGENCYHEATING: 5,
  },
  runningModeTypes: {
    OFF: 0,
    COOL: 3,
    HEAT: 4,
  },
  bitConditions: {
    IT600: {
      HEATINGON: '8_0_1',
      HEATINGOFF: '8_0_0',
      COOLINGON: '8_1_1',
      COOLINGOFF: '8_1_0',
    },
    FC600: {
      HEATINGON: '8_0_1-8_3_1',
      HEATINGOFF: '8_0_0+8_3_0',
      COOLINGON: '8_1_1-8_4_1',
      COOLINGOFF: '8_1_0+8_4_0',
    },
    QUANTUMTHERMOSTAT: {
      HeatOrCoolON: '8_0_1-8_1_1',
      HeatAndCoolOFF: '8_0_0+8_1_0',
    },
    DIALRFTHERMOSTAT: {
      HeatOrCoolON: '8_0_1-8_1_1',
      HeatAndCoolOFF: '8_0_0+8_1_0',
    },
  },
  thermostatPairedType: {
    TRV: 101,
    SMARTPLUG: 104,
    SMARTRELAY: 105,
    BoilerReceiver: 102,
    RoomExtensionReceiver: 103,
    WIREDDEVICE: 10,
  },
  quantumThermostatPairedType: {
    TRV: 101,
    SMARTPLUG: 104,
    SMARTRELAY: 105,
    BoilerReceiver: 102,
    RoomExtensionReceiver: 103,
    WIREDDEVICE: 10,
  },
  quantumThermostatTemperature: {
    HEATOFF: 450,
    COOLOFF: 4050,
  },
  locationMode: {
    OUTSIDE: '0',
    INSIDE: '1',
    INACTIVE: '2',
  },
  rollerShutterMode: {
    ROLLERMODE: 'ROLLERMODE',
    DOUBLELIGHT: 'DOUBLELIGHT',
    SINGLELIGHT: 'SINGLELIGHT',
    REPEATER: 'REPEATER',
  },
  getRunningStateTypes: function(e) {
    if ('' === e || null === e) {
      return null;
    }
    e = parseInt(e).toString(2);
    for (let t = e.length, i = t; i < 8; i++) {
      e = '0' + e;
    }
    return e = '1' === e[7] || '1' === e[4] ? 'HEAT' : '1' === e[6] || '1' === e[3] ? 'COOL' : 'OFF';
  },
  parseRunningStateTypesToBitArray: function(e) {
    if ('' === e || null === e) {
      return null;
    }
    e = parseInt(e).toString(2);
    for (let t = e.length, i = t; i < 8; i++) {
      e = '0' + e;
    }
    return e.split('').reverse();
  },
  getOperationModeValues: function(e, t) {
    if ('' === e || null === e) {
      return '2';
    }
    e = parseInt(e).toString(2);
    for (let i = e.length, n = i; n < 8; n++) {
      e = '0' + e;
    }
    if (t || '0' === e[6] && !t) {
      const o = e.substr(0, 6)
        , s = e.substr(7)
        , a = o + '1' + s;
      return e = parseInt(a, 2);
    }
    return null;
  },
  getFC600RunningStateTypes: function(e) {
    if ('' === e || null === e) {
      return null;
    }
    e = parseInt(e).toString(2);
    for (let t = e.length, i = t; i < 8; i++) {
      e = '0' + e;
    }
    return e = '1' === e[0] ? 'GREY' : '1' === e[7] ? 'HEAT' : '1' === e[6] ? 'COOL' : '0' === e[6] && '0' === e[7] ? 'OFF' : null;
  },
  fanModeTypes: {
    OFF: 0,
    SPEED1: 1,
    SPEED2: 2,
    SPEED3: 3,
    ON: 4,
    AUTO: 5,
  },
  waterHeaterHoldTypes: {
    SCHEDULE: 0,
    OFF: 7,
    BOOST: 8,
    CONTINUOUS: 9,
    BOOST1H: 11,
    BOOST2H: 12,
    BOOST3H: 13,
    BOOST4H: 14,
  },
  it600HoldTypes: {
    FOLLOW: 0,
    TEMPHOLD: 1,
    PERMHOLD: 2,
    OFF: 7,
    OFF2: 99,
    ORIGINAL: 98,
  },
  quantumThermostatHoldTypes: {
    FOLLOW: 0,
    TEMPHOLD: 1,
    PERMHOLD: 2,
    HOLIDAY: 6,
    OFF: 7,
  },
  dialRFThermostatHoldTypes: {
    FOLLOW: 0,
    TEMPHOLD: 1,
    PERMHOLD: 2,
  },
  fc600HoldTypes: {
    FOLLOW: 0,
    TEMPHOLD: 1,
    PERMHOLD: 2,
    ECO: 10,
    OFF: 7,
  },
  ocupancy: {
    OCCUPIED: 1,
    UNOCCUPIED: 0,
  },
  lockKey: {
    LOCK: 1,
    UNLOCK: 0,
  },
  pairedTypes: {
    TRV: 'TRV',
    RX1: 'RX1',
    RX2: 'RX2',
    SPE600: 'SPE600',
    CTLP632: 'CTLP632',
    SR600: 'SR600',
    WC: 'WC',
    WIREDDEVICE: 'WIREDDEVICE',
  },
  thermostatHoldDuration: 65535,
  tileGradients: {
    TILE_GREEN_GRADIENT_TOP: '#7cc110',
    TILE_GREEN_GRADIENT_BOTTOM: '#58a708',
    TILE_RED_GRADIENT_TOP: '#f44336',
    TILE_RED_GRADIENT_BOTTOM: '#eb1c14',
  },
  sceneGradients: [{
    TOP: '#7CC110',
    BOTTOM: '#58A708',
  }, {
    TOP: '#0399E4',
    BOTTOM: '#027DD9',
  }, {
    TOP: '#00C1DD',
    BOTTOM: '#00ACD0',
  }],
  myStatusTileColors: {
    topColors: {
      turq: '#1cddad',
      blue: '#0097a7',
      orange: '#eab925',
      brown: '#bbc532',
      green: '#00df72',
    },
    botColors: {
      turq: '#04ad92',
      blue: '#00838f',
      orange: '#ffa000',
      brown: '#a4a929',
      green: '#00bc4e',
    },
  },
  errorTypes: {
    error404: '404',
    REQUEST: 'request',
  },
  apiErrorReason: {
    PASSWORD_INCORRECT: 'passwordIncorrect',
    UNKNOWN: 'unknown',
  },
  idelTimeOuts: {
    tileFlipIdelTime: 6e4,
    tileMoveIdelTime: 6e4,
    settingIdelClose: 6e4,
    scanIdelTime: 6e4,
  },
  daysOfWeekMap: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  daysOfWeek: {
    SUNDAY: 1,
    MONDAY: 2,
    TUESDAY: 3,
    WEDNESDAY: 4,
    THURSDAY: 5,
    FRIDAY: 6,
    SATURDAY: 7,
  },
  scheduleDaysTypes: {
    WORKWEEK: 'workWeek',
    WEEKEND: 'weekend',
    FULLWEEK: 'fullWeek',
  },
  weekTypeMap: {
    fullWeek: [1, 2, 3, 4, 5, 6, 7],
    workWeek: [2, 3, 4, 5, 6],
    weekend: [1, 7],
  },
  scheduleConfigurationTypes: {
    WORKWEEK: 'workWeek',
    FULLWEEK: 'fullWeek',
    DAILY: 'daily',
  },
};