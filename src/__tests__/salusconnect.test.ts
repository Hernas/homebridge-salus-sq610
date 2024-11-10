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



const response = {
  "id": [
      {
          "sScheS": {
              "ScheduleEnable": 1,
              "CoolSchedule2": "49ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule1": "57000400250020001800ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              "HeatSchedule2": "57ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule3": "57ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "CoolSchedule1": "49010600240023002600ffff2100ffff2100ffff1800ffff2100dd0600240023002600ffff2100ffff2100ffff1800ffff2100ffffffffffffffffffffffff",
              "CoolSchedule3": "49ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd"
          },
          "data": {
              "DeviceType": 100,
              "Endpoint": 9,
              "UniID": "001e5e090905455d"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370012002a",
              "DeviceSubType": 66,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e090905455d",
              "ModelIdentifier_i": "SQ610RFNH(WB)",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e090905455d",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "231228",
              "FirmwareVersion": "00000047",
              "ShortID_d": 22128,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Bad\", \"ShortID_d\": 22128}"
          },
          "sIT600D": {
              "DeviceIndex": 32,
              "SyncResponseVersion_d": "00000047",
              "ConnectType_i": 1
          },
          "sBasicS": {
              "ModelIdentifier": "SQ610RFNH(WB)",
              "HardwareVersion": "32"
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sEndpt": {
              "DeviceType": 66,
              "Endpoint_i": 9
          },
          "sIT600TH": {
              "LockKey": 0,
              "Status_2_d": "7205010000010500405000010501040027001000060035000500400005000100000001018000000009fe030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "Schedule": "7205010000010500405000010501040027001000060035000500400005000100000001018000000009fe030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "HeatingControl": 1,
              "Error23": 0,
              "OUTSensorProbe": 0,
              "SystemMode_a": 4,
              "MaxCoolSetpoint_x100": 4000,
              "HoldType": 0,
              "MinCoolSetpoint_x100": 500,
              "MaxHeatSetpoint_x100": 3500,
              "Error25": 0,
              "Error06": 0,
              "MaxHeatSetpoint_x100_a": 3500,
              "CoolingSetpoint_x100_a": 1800,
              "OUTSensorType": 0,
              "CloudOverride": 0,
              "CoolingControl": 1,
              "LocalTemperature_x100": 2100,
              "Error03": 0,
              "MinHeatSetpoint_x100": 500,
              "Error08": 0,
              "CoolingSetpoint_x100": 1800,
              "MinCoolSetpoint_x100_a": 500,
              "Error21": 0,
              "TemperatureDisplayMode": 0,
              "Status_d": "f1390d0021000000011800180024000400003030303000007305ffffffffffffffffffffffff01010380060500405005010498c25b6f4360000000ffffffffffffffffffffffff000003000129",
              "Error04": 0,
              "SystemMode": 4,
              "Error32": 0,
              "ProgramOperationMode": 0,
              "Error01": 0,
              "AutoHeatingSetpoint_x100": 1800,
              "Error02": 0,
              "Error31": 0,
              "Error07": 0,
              "HoldType_a": 0,
              "Error09": 0,
              "Error22": 0,
              "Error24": 0,
              "Error30": 0,
              "HeatingSetpoint_x100": 1800,
              "AutoCoolingSetpoint_x100": 2400,
              "ScheduleType": 1,
              "RunningState": 0,
              "PairedWCNumber": 2,
              "SunnySetpoint_x100": 73,
              "TimeFormat24Hour": 1,
              "PairedTRVShortID": "FFFFFFFFFFFFFFFFFFFFFFFF",
              "HeatingSetpoint_x100_a": 1800,
              "LockKey_a": 0,
              "BatteryLevel": 4
          },
          "sIT600I": {
              "CommandResponse_d": "42323000",
              "LastMessageLQI_d": 164,
              "LastMessageRSSI_d": -59
          }
      },
      {
          "data": {
              "DeviceType": 100,
              "Endpoint": 8,
              "UniID": "001e5e09090253cb"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370014",
              "DeviceSubType": 0,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e09090253cb",
              "ModelIdentifier_i": "it600WC",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e09090253cb",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "211006",
              "FirmwareVersion": "20230222",
              "ShortID_d": 5097,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Verteiler 1.OG\", \"ShortID_d\": 5097}"
          },
          "sIT600D": {
              "DeviceIndex": 2,
              "SyncResponseVersion_d": "20230222",
              "ConnectType_i": 255
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sBasicS": {
              "ManufactureName": "Computime",
              "ModelIdentifier": "it600WC",
              "HardwareVersion": "1"
          },
          "sEndpt": {
              "DeviceType": 0,
              "Endpoint_i": 8
          },
          "sIT600I": {
              "CommandResponse_d": "423730000000000008a8a208567008fa4408ffff00ffff00ffff00ffff00ffff00ffff00ffff00ffff00ffff0000ab007eaaaaa8800000001478",
              "LastMessageLQI_d": 0,
              "LastMessageRSSI_d": -85
          },
          "sIT600WC": {
              "Error11": 0,
              "Error27": 0,
              "Error16": 0,
              "ErrorCodeWC_d": "0000",
              "Error10": 0,
              "Error18": 0,
              "Error20": 0,
              "Error17": 0,
              "Error12": 0,
              "Error26": 0,
              "Error15": 0,
              "Error13": 0,
              "Error14": 0,
              "Error19": 0,
              "Error28": 0,
              "Error29": 0
          }
      },
      {
          "sScheS": {
              "ScheduleEnable": 1,
              "CoolSchedule2": "42ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule1": "540000001800ffff0500ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              "HeatSchedule2": "54ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule3": "54ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "CoolSchedule1": "42010600240023002600ffff2100ffff2100ffff1800ffff2100dd0600240023002600ffff2100ffff2100ffff1800ffff2100ffffffffffffffffffffffff",
              "CoolSchedule3": "42ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd"
          },
          "data": {
              "DeviceType": 100,
              "Endpoint": 9,
              "UniID": "001e5e090905453f"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370012002a",
              "DeviceSubType": 66,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e090905453f",
              "ModelIdentifier_i": "SQ610RFNH(WB)",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e090905453f",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "231228",
              "FirmwareVersion": "00000047",
              "ShortID_d": 65470,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Dachgeschoss Zimmer klein\", \"ShortID_d\": 65470}"
          },
          "sIT600D": {
              "DeviceIndex": 32,
              "SyncResponseVersion_d": "00000047",
              "ConnectType_i": 1
          },
          "sBasicS": {
              "ModelIdentifier": "SQ610RFNH(WB)",
              "HardwareVersion": "32"
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sEndpt": {
              "DeviceType": 66,
              "Endpoint_i": 9
          },
          "sIT600TH": {
              "Schedule": "720601000001050040500001050104002700100006003500050040000500010000000101800000000bfe030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "HeatingControl": 1,
              "Error23": 0,
              "MaxHeatSetpoint_x100": 3500,
              "MinCoolSetpoint_x100": 500,
              "SystemMode_a": 4,
              "OUTSensorProbe": 0,
              "HoldType": 0,
              "MaxCoolSetpoint_x100": 4000,
              "Error25": 0,
              "Error06": 0,
              "MaxHeatSetpoint_x100_a": 3500,
              "CoolingSetpoint_x100_a": 1800,
              "OUTSensorType": 0,
              "CoolingControl": 1,
              "CloudOverride": 0,
              "LocalTemperature_x100": 1890,
              "Error03": 0,
              "MinHeatSetpoint_x100": 500,
              "Error08": 0,
              "CoolingSetpoint_x100": 1800,
              "MinCoolSetpoint_x100_a": 500,
              "Error21": 0,
              "TemperatureDisplayMode": 0,
              "LockKey": 0,
              "Status_2_d": "720601000001050040500001050104002700100006003500050040000500010000000101800000000bfe030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "Status_d": "f19f0d0018900000011800180024000400003030303000006206ffffffffffffffffffffffff010403810605004050050104e4d55b6f3f5b000000ffffffffffffffffffffffff000000000129",
              "Error04": 0,
              "SystemMode": 4,
              "Error32": 0,
              "ProgramOperationMode": 0,
              "Error01": 0,
              "AutoHeatingSetpoint_x100": 1800,
              "Error02": 0,
              "Error31": 0,
              "Error07": 0,
              "HoldType_a": 0,
              "Error09": 0,
              "Error22": 0,
              "Error24": 0,
              "Error30": 0,
              "HeatingSetpoint_x100": 1800,
              "AutoCoolingSetpoint_x100": 2400,
              "ScheduleType": 1,
              "RunningState": 0,
              "PairedWCNumber": 3,
              "SunnySetpoint_x100": 62,
              "TimeFormat24Hour": 1,
              "PairedTRVShortID": "FFFFFFFFFFFFFFFFFFFFFFFF",
              "HeatingSetpoint_x100_a": 1800,
              "LockKey_a": 0,
              "BatteryLevel": 4
          },
          "sIT600I": {
              "CommandResponse_d": "42323000",
              "LastMessageLQI_d": 232,
              "LastMessageRSSI_d": -42
          }
      },
      {
          "data": {
              "DeviceType": 200,
              "Endpoint": 0,
              "UniID": "0000000000000000"
          },
          "sZDOInfo": {
              "OnlineStatus_i": 1,
              "zigbeeOTATimeout_i": 4800,
              "zigbeeOTArespond_i": 0,
              "zigbeeOTAFailDebugCode_i": 1792
          },
          "DeviceL": {
              "DeviceType": 200,
              "AttributeList": "000100040003001100050008000b00100033",
              "DeviceSubType": 0,
              "getModelIdentifierFlag_i": 1,
              "Unq[11/9/2024, 8:54:55 PM] [@hernas/homebridge-salus-sq610] Could not load the devices: SyntaxError: Unexpected token u in JSON at position 0uieID": "0000000000000000",
              "ModelIdentifier_i": "SAU2AG1-ZC",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0,
              "OTAFirmwareURL_d": "http://ec2-18-194-20-66.eu-central-1.compute.amazonaws.com/firmware/UG-SYS/UG600/ZC/SAU2AG1-ZC_20240613.tar.gz[0,successed]"
          },
          "sZDO": {
              "ProtocalType_i": 2,
              "MACAddress": "001e5e0909019c27",
              "FirmwareVersion": "20240613",
              "ShortID_d": 0,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"MHZ15\", \"ShortID_d\": 0}"
          },
          "sCoord": {
              "Form_d": 1,
              "PANID_d": 12042,
              "ReceiveZigbeeCommand_d": "7c0f7d09fc44fa0900087e008000ba",
              "Channel_d": 25,
              "ErrorCoordUART": 0,
              "PermitJoinState_d": 0,
              "TimeFormat24Hour": 1,
              "IdentifyInProgress_i": 0,
              "DeviceTimeOffset_i": 0,
              "DeviceTimeZone_i": 3600,
              "DeviceDST_i": 1,
              "DeviceGMT_i": 1729990800
          },
          "sBasicS": {
              "ModelIdentifier": "SAU2AG1-ZC",
              "HardwareVersion": "65"
          },
          "sEndpt": {
              "DeviceType": 0,
              "Endpoint_i": 0
          }
      },
      {
          "sScheS": {
              "ScheduleEnable": 1,
              "CoolSchedule2": "46ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule1": "53000400250020001800ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              "HeatSchedule2": "53ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule3": "53ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "CoolSchedule1": "4601ffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ddffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffff",
              "CoolSchedule3": "46ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd"
          },
          "data": {
              "DeviceType": 100,
              "Endpoint": 9,
              "UniID": "001e5e0909054286"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370012002a",
              "DeviceSubType": 66,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e0909054286",
              "ModelIdentifier_i": "SQ610RFNH(WB)",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e0909054286",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "231228",
              "FirmwareVersion": "00000047",
              "ShortID_d": 28401,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Dachgeschoss Bad\", \"ShortID_d\": 28401}"
          },
          "sIT600D": {
              "DeviceIndex": 32,
              "SyncResponseVersion_d": "00000047",
              "ConnectType_i": 1
          },
          "sBasicS": {
              "ModelIdentifier": "SQ610RFNH(WB)",
              "HardwareVersion": "32"
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sEndpt": {
              "DeviceType": 66,
              "Endpoint_i": 9
          },
          "sIT600TH": {
              "LockKey": 0,
              "Status_2_d": "7203010000010500405000010501040027001000060035000500400005000100000001018000000005ff030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "Schedule": "7203010000010500405000010501040027001000060035000500400005000100000001018000000005ff030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "HeatingControl": 1,
              "Error23": 0,
              "OUTSensorProbe": 0,
              "SystemMode_a": 4,
              "MaxCoolSetpoint_x100": 4000,
              "HoldType": 0,
              "MinCoolSetpoint_x100": 500,
              "MaxHeatSetpoint_x100": 3500,
              "Error25": 0,
              "Error06": 0,
              "MaxHeatSetpoint_x100_a": 3500,
              "CoolingSetpoint_x100_a": 1800,
              "OUTSensorType": 0,
              "CloudOverride": 0,
              "CoolingControl": 1,
              "LocalTemperature_x100": 1840,
              "Error03": 0,
              "MinHeatSetpoint_x100": 500,
              "Error08": 0,
              "CoolingSetpoint_x100": 1800,
              "MinCoolSetpoint_x100_a": 500,
              "Error21": 0,
              "TemperatureDisplayMode": 0,
              "Status_d": "71db0d0018400000011800180024000400003030303000005906ffffffffffffffffffffffff01010384060500405005010494c15b6f4256000000ffffffffffffffffffffffff000009000129",
              "Error04": 0,
              "SystemMode": 4,
              "Error32": 0,
              "ProgramOperationMode": 0,
              "Error01": 0,
              "AutoHeatingSetpoint_x100": 1800,
              "Error02": 0,
              "Error31": 0,
              "Error07": 0,
              "HoldType_a": 0,
              "Error09": 0,
              "Error22": 0,
              "Error24": 0,
              "Error30": 0,
              "HeatingSetpoint_x100": 1800,
              "AutoCoolingSetpoint_x100": 2400,
              "ScheduleType": 1,
              "RunningState": 0,
              "PairedWCNumber": 3,
              "SunnySetpoint_x100": 59,
              "TimeFormat24Hour": 1,
              "PairedTRVShortID": "FFFFFFFFFFFFFFFFFFFFFFFF",
              "HeatingSetpoint_x100_a": 1800,
              "LockKey_a": 0,
              "BatteryLevel": 4
          },
          "sIT600I": {
              "CommandResponse_d": "42323000",
              "LastMessageLQI_d": 192,
              "LastMessageRSSI_d": -52
          }
      },
      {
          "sScheS": {
              "ScheduleEnable": 1,
              "CoolSchedule2": "4cffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule1": "60000700250020001800ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              "HeatSchedule2": "60ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule3": "60ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "CoolSchedule1": "4c01ffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ddffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffff",
              "CoolSchedule3": "4cffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd"
          },
          "data": {
              "DeviceType": 100,
              "Endpoint": 9,
              "UniID": "001e5e0909053e4a"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370012002a",
              "DeviceSubType": 66,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e0909053e4a",
              "ModelIdentifier_i": "SQ610RFNH(WB)",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e0909053e4a",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "231228",
              "FirmwareVersion": "00000047",
              "ShortID_d": 43170,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Kinderzimmer\", \"ShortID_d\": 43170}"
          },
          "sIT600D": {
              "DeviceIndex": 32,
              "SyncResponseVersion_d": "00000047",
              "ConnectType_i": 1
          },
          "sBasicS": {
              "ModelIdentifier": "SQ610RFNH(WB)",
              "HardwareVersion": "32"
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sEndpt": {
              "DeviceType": 66,
              "Endpoint_i": 9
          },
          "sIT600TH": {
              "LockKey": 0,
              "Status_2_d": "7204010000010500405000000501040027001000060035000500400005000100000001018000000007fe030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "Schedule": "7204010000010500405000000501040027001000060035000500400005000100000001018000000007fe030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "HeatingControl": 1,
              "Error23": 0,
              "OUTSensorProbe": 0,
              "SystemMode_a": 4,
              "MaxCoolSetpoint_x100": 4000,
              "HoldType": 0,
              "MinCoolSetpoint_x100": 500,
              "MaxHeatSetpoint_x100": 3500,
              "Error25": 0,
              "Error06": 0,
              "MaxHeatSetpoint_x100_a": 3500,
              "CoolingSetpoint_x100_a": 1800,
              "OUTSensorType": 0,
              "CloudOverride": 0,
              "CoolingControl": 0,
              "LocalTemperature_x100": 2000,
              "Error03": 0,
              "MinHeatSetpoint_x100": 500,
              "Error08": 0,
              "CoolingSetpoint_x100": 1800,
              "MinCoolSetpoint_x100_a": 500,
              "Error21": 0,
              "TemperatureDisplayMode": 0,
              "Status_d": "711e0d0020000000011800180024000400003030303000005505ffffffffffffffffffffffff0101038506050040500501049cc313e94563000000ffffffffffffffffffffffff00000d000129",
              "Error04": 0,
              "SystemMode": 4,
              "Error32": 0,
              "ProgramOperationMode": 0,
              "Error01": 0,
              "AutoHeatingSetpoint_x100": 1800,
              "Error02": 0,
              "Error31": 0,
              "Error07": 0,
              "HoldType_a": 0,
              "Error09": 0,
              "Error22": 0,
              "Error24": 0,
              "Error30": 0,
              "HeatingSetpoint_x100": 1800,
              "AutoCoolingSetpoint_x100": 2400,
              "ScheduleType": 1,
              "RunningState": 0,
              "PairedWCNumber": 2,
              "SunnySetpoint_x100": 55,
              "TimeFormat24Hour": 1,
              "PairedTRVShortID": "FFFFFFFFFFFFFFFFFFFFFFFF",
              "HeatingSetpoint_x100_a": 1800,
              "LockKey_a": 0,
              "BatteryLevel": 4
          },
          "sIT600I": {
              "CommandResponse_d": "42323000"
          }
      },
      {
          "sScheS": {
              "ScheduleEnable": 1,
              "CoolSchedule2": "3effffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "CoolSchedule1": "3e01ffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ddffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffff",
              "CoolSchedule3": "3effffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule1": "0b000700250020001800ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              "HeatSchedule2": "0bffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule3": "0bffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd"
          },
          "data": {
              "DeviceType": 100,
              "Endpoint": 9,
              "UniID": "001e5e090905458c"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370012002a",
              "DeviceSubType": 66,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e090905458c",
              "ModelIdentifier_i": "SQ610RFNH(WB)",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e090905458c",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "231228",
              "FirmwareVersion": "00000047",
              "ShortID_d": 56930,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Flur/WC\", \"ShortID_d\": 56930}"
          },
          "sIT600D": {
              "DeviceIndex": 32,
              "SyncResponseVersion_d": "00000047",
              "ConnectType_i": 1
          },
          "sBasicS": {
              "ModelIdentifier": "SQ610RFNH(WB)",
              "HardwareVersion": "32"
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sEndpt": {
              "DeviceType": 66,
              "Endpoint_i": 9
          },
          "sIT600TH": {
              "LockKey": 0,
              "Status_2_d": "7201010000010500405000010501040027001000060035000500400005000100000001018000000001ff030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "Schedule": "7201010000010500405000010501040027001000060035000500400005000100000001018000000001ff030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "HeatingControl": 1,
              "Error23": 0,
              "OUTSensorProbe": 0,
              "SystemMode_a": 4,
              "MaxCoolSetpoint_x100": 4000,
              "HoldType": 0,
              "MinCoolSetpoint_x100": 500,
              "MaxHeatSetpoint_x100": 3500,
              "Error25": 0,
              "Error06": 0,
              "MaxHeatSetpoint_x100_a": 3500,
              "CoolingSetpoint_x100_a": 1800,
              "OUTSensorType": 0,
              "CloudOverride": 0,
              "CoolingControl": 1,
              "LocalTemperature_x100": 1760,
              "Error03": 0,
              "MinHeatSetpoint_x100": 500,
              "Error08": 0,
              "CoolingSetpoint_x100": 1800,
              "MinCoolSetpoint_x100_a": 500,
              "Error21": 0,
              "TemperatureDisplayMode": 0,
              "Status_d": "71030d0017600000011800180024000404013030303000006304ffffffffffffffffffffffff01010378010500405005010488be13e9083e000000ffffffffffffffffffffffff000012000129",
              "Error04": 0,
              "SystemMode": 4,
              "Error32": 0,
              "ProgramOperationMode": 0,
              "Error01": 0,
              "AutoHeatingSetpoint_x100": 1800,
              "Error02": 0,
              "Error31": 0,
              "Error07": 0,
              "HoldType_a": 0,
              "Error09": 0,
              "Error22": 0,
              "Error24": 0,
              "Error30": 0,
              "HeatingSetpoint_x100": 1800,
              "AutoCoolingSetpoint_x100": 2400,
              "ScheduleType": 1,
              "RunningState": 1,
              "PairedWCNumber": 1,
              "SunnySetpoint_x100": 63,
              "TimeFormat24Hour": 1,
              "PairedTRVShortID": "FFFFFFFFFFFFFFFFFFFFFFFF",
              "HeatingSetpoint_x100_a": 1800,
              "LockKey_a": 0,
              "BatteryLevel": 4
          },
          "sIT600I": {
              "CommandResponse_d": "42323000"
          }
      },
      {
          "sScheS": {
              "ScheduleEnable": 1,
              "CoolSchedule2": "3effffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "CoolSchedule1": "3e010600240023002600ffff2100ffff2100ffff1800ffff2100dd0600240023002600ffff2100ffff2100ffff1800ffff2100ffffffffffffffffffffffff",
              "CoolSchedule3": "3effffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule1": "0a000700250020001800ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              "HeatSchedule2": "0affffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule3": "0affffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd"
          },
          "data": {
              "DeviceType": 100,
              "Endpoint": 9,
              "UniID": "001e5e0909054388"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370012002a",
              "DeviceSubType": 66,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e0909054388",
              "ModelIdentifier_i": "SQ610RFNH(WB)",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e0909054388",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "231228",
              "FirmwareVersion": "00000047",
              "ShortID_d": 21194,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Küche\", \"ShortID_d\": 21194}"
          },
          "sIT600D": {
              "DeviceIndex": 32,
              "SyncResponseVersion_d": "00000047",
              "ConnectType_i": 1
          },
          "sBasicS": {
              "ModelIdentifier": "SQ610RFNH(WB)",
              "HardwareVersion": "32"
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sEndpt": {
              "DeviceType": 66,
              "Endpoint_i": 9
          },
          "sIT600TH": {
              "LockKey": 0,
              "Status_2_d": "7202010000010500405000010501040027001000060035000500400005000100000001018000000003ff030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "Schedule": "7202010000010500405000010501040027001000060035000500400005000100000001018000000003ff030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "HeatingControl": 1,
              "Error23": 0,
              "OUTSensorProbe": 0,
              "SystemMode_a": 4,
              "MaxCoolSetpoint_x100": 4000,
              "HoldType": 0,
              "MinCoolSetpoint_x100": 500,
              "MaxHeatSetpoint_x100": 3500,
              "Error25": 0,
              "Error06": 0,
              "MaxHeatSetpoint_x100_a": 3500,
              "CoolingSetpoint_x100_a": 1800,
              "OUTSensorType": 0,
              "CloudOverride": 0,
              "CoolingControl": 1,
              "LocalTemperature_x100": 2200,
              "Error03": 0,
              "MinHeatSetpoint_x100": 500,
              "Error08": 0,
              "CoolingSetpoint_x100": 1800,
              "MinCoolSetpoint_x100_a": 500,
              "Error21": 0,
              "TemperatureDisplayMode": 0,
              "Status_d": "f1140d0022000000011800180024000400003030303000005504ffffffffffffffffffffffff010103840605004050050104d8d213e90848000000ffffffffffffffffffffffff000001000129",
              "Error04": 0,
              "SystemMode": 4,
              "Error32": 0,
              "ProgramOperationMode": 0,
              "Error01": 0,
              "AutoHeatingSetpoint_x100": 1800,
              "Error02": 0,
              "Error31": 0,
              "Error07": 0,
              "HoldType_a": 0,
              "Error09": 0,
              "Error22": 0,
              "Error24": 0,
              "Error30": 0,
              "HeatingSetpoint_x100": 1800,
              "AutoCoolingSetpoint_x100": 2400,
              "ScheduleType": 1,
              "RunningState": 0,
              "PairedWCNumber": 1,
              "SunnySetpoint_x100": 55,
              "TimeFormat24Hour": 1,
              "PairedTRVShortID": "FFFFFFFFFFFFFFFFFFFFFFFF",
              "HeatingSetpoint_x100_a": 1800,
              "LockKey_a": 0,
              "BatteryLevel": 4
          },
          "sIT600I": {
              "CommandResponse_d": "42323000"
          }
      },
      {
          "sScheS": {
              "ScheduleEnable": 1,
              "CoolSchedule2": "3cffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule1": "53010700250018001800ffff0500ffff0500ffff0500ffff0500dd00001800ffff0500ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffff",
              "HeatSchedule2": "53ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule3": "53ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "CoolSchedule1": "3c01ffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ddffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffff",
              "CoolSchedule3": "3cffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd"
          },
          "data": {
              "DeviceType": 100,
              "Endpoint": 9,
              "UniID": "001e5e09090541ce"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370012002a",
              "DeviceSubType": 66,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e09090541ce",
              "ModelIdentifier_i": "SQ610RFNH(WB)",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e09090541ce",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "231228",
              "FirmwareVersion": "00000047",
              "ShortID_d": 14703,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Dachgeschoss Arbeitszimmer\", \"ShortID_d\": 14703}"
          },
          "sIT600D": {
              "DeviceIndex": 32,
              "SyncResponseVersion_d": "00000047",
              "ConnectType_i": 1
          },
          "sBasicS": {
              "ModelIdentifier": "SQ610RFNH(WB)",
              "HardwareVersion": "32"
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sEndpt": {
              "DeviceType": 66,
              "Endpoint_i": 9
          },
          "sIT600TH": {
              "LockKey": 0,
              "Status_2_d": "7204010000010500405000010501040027001000060035000500400005000100000001018000000007fe030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "Schedule": "7204010000010500405000010501040027001000060035000500400005000100000001018000000007fe030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "HeatingControl": 1,
              "Error23": 0,
              "OUTSensorProbe": 0,
              "SystemMode_a": 4,
              "MaxCoolSetpoint_x100": 4000,
              "HoldType": 0,
              "MinCoolSetpoint_x100": 500,
              "MaxHeatSetpoint_x100": 3500,
              "Error25": 0,
              "Error06": 0,
              "MaxHeatSetpoint_x100_a": 3500,
              "CoolingSetpoint_x100_a": 1800,
              "OUTSensorType": 0,
              "CloudOverride": 0,
              "CoolingControl": 1,
              "LocalTemperature_x100": 1880,
              "Error03": 0,
              "MinHeatSetpoint_x100": 500,
              "Error08": 0,
              "CoolingSetpoint_x100": 1800,
              "MinCoolSetpoint_x100_a": 500,
              "Error21": 0,
              "TemperatureDisplayMode": 0,
              "Status_d": "f1590d0018800000011800180024000400003030303000006006ffffffffffffffffffffffff010103780605004050050104c8ce5b6f4052000000ffffffffffffffffffffffff000007000129",
              "Error04": 0,
              "SystemMode": 4,
              "Error32": 0,
              "ProgramOperationMode": 0,
              "Error01": 0,
              "AutoHeatingSetpoint_x100": 1800,
              "Error02": 0,
              "Error31": 0,
              "Error07": 0,
              "HoldType_a": 0,
              "Error09": 0,
              "Error22": 0,
              "Error24": 0,
              "Error30": 0,
              "HeatingSetpoint_x100": 1800,
              "AutoCoolingSetpoint_x100": 2400,
              "ScheduleType": 1,
              "RunningState": 0,
              "PairedWCNumber": 3,
              "SunnySetpoint_x100": 60,
              "TimeFormat24Hour": 1,
              "PairedTRVShortID": "FFFFFFFFFFFFFFFFFFFFFFFF",
              "HeatingSetpoint_x100_a": 1800,
              "LockKey_a": 0,
              "BatteryLevel": 4
          },
          "sIT600I": {
              "CommandResponse_d": "42323000",
              "LastMessageLQI_d": 128,
              "LastMessageRSSI_d": -68
          }
      },
      {
          "data": {
              "DeviceType": 300,
              "Endpoint": 0,
              "UniID": "0000000000000000"
          },
          "sRule": {
              "UpdateRuleJsonStatus": 0,
              "ActionValue": "[0]",
              "ActionValue_i": "[0]"
          },
          "DeviceL": {
              "DeviceType": 300,
              "AttributeList": "00010002000b000c001e003100330036000f000e0010003a003c",
              "DeviceSubType": 0,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "0000000000000000",
              "ModelIdentifier_i": "SAU2AG1-GW",
              "DeviceEndpointNum_i": 1
          },
          "sGateway": {
              "NetworkWiFiMAC": "00:1e:5e:04:76:50",
              "LocalModeAccessCode": "c8ec4f545d858840761f7061ed7c63d8d67575825788c2a5c493c4276ed91871",
              "IsSdCardNormal_i": 0,
              "NetworkSSID_f": "fdb783604bdf1a2e4d6a78802c91ab7b",
              "DisableLocalMode": 0,
              "GatewaySoftwareVersion": "021720240719",
              "NetworkPassword": "fdb783604bdf1a2e4d6a78802c91ab7b",
              "GatewayHardwareVersion": "65",
              "NetworkLANIP": "192.168.0.88",
              "EnableNetworkReset": 0,
              "NetworkLANMAC": "00:1e:5e:04:76:51",
              "NetworkSSID": "fdb783604bdf1a2e4d6a78802c91ab7b",
              "OutboundIP": "79.245.127.119",
              "KeyState_i": 0,
              "IsRtcRight_i": 1,
              "NetworkPriDNS": "192.168.0.26",
              "LANConnected_d": 1,
              "LEDMode": 1,
              "Sunrise": "1731219123",
              "WiFiConnected_d": 0,
              "NetworkPassword_f": "fdb783604bdf1a2e4d6a78802c91ab7b",
              "TimeOffset_i": 0,
              "NetworkLANRouterAddr": "192.168.0.1",
              "NetworkLANSubnet": "255.255.255.0",
              "NetworkSecDNS": "8.8.8.8",
              "NetworkLANMode": 1,
              "WirelessAPpassword": "e81ca56d413099087b5500cc5f2ab3f8",
              "ModelIdentifier": "UGE600",
              "AylaConnected_i": 0,
              "PhoneLocation": "",
              "WiFiMode": 0,
              "SunriseTime_i": "071203",
              "SunsetTime_i": "164300",
              "Sunset": "1731253380",
              "TimeZone": "Europe/Berlin",
              "TimeStatus_i": 2,
              "DSTEnable_i": 1,
              "DeviceTimeZone_i": 3600,
              "ProvWindowStartTS": "0"
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "Product": {
              "Mode": 1,
              "Model": "SAL2BG1"
          },
          "sDebug": {
              "LocalDebugMsg_d": "Model ID is: SAL2BG1",
              "AylaHeartBeatFrequency": 0,
              "GatewayDebugMsg": "[GW time:2024-07-30 23:43:40,98],FactoryReset from Local,and time is 2022-08-26 11:08:20",
              "ZigbeeDebugMsg": "[GW time:2024-07-31 02:33:41,10285],tm:Wed Jul 31 02:33:41 2024\n,03010200000000000000000000000000000000000000000000000000000000",
              "AwsDebugMsg": "[GW time:2024-11-08 04:45:04,8658167],2024-11-08T04:45:03.807Z MQTT Disconnect,times:21,reconn:1,max_t:215425ms"
          },
          "sAWSIoT": {
              "CertARN": "b834518b5b0ca4a0fe036b34d37c2bf920f5429a8d5b2e0405b6da485bf456fe",
              "PairingFlag": 0,
              "AWSPackLenLimit": 0,
              "CloudStatus": 1,
              "CertsStatus": 1,
              "CloudID": "056716091814",
              "DisableAyla": 1,
              "GWThingName": "SAU2AG1_GW-001E5E047650"
          },
          "Protect": {
              "ProtectConfig": "ND:30;NSD:30;XD:60;XSD:60;24S:3;S:1",
              "PanelStatus": 0,
              "AlarmStatus": 0
          },
          "sWifiDM": {
              "WiFiDeviceNumber": 10,
              "Wifiinfo0": "DeviceID:0;Model:0;Name:0",
              "Wifiinfo1": "DeviceID:0;Model:0;Name:0",
              "Wifiinfo2": "DeviceID:0;Model:0;Name:0",
              "Wifiinfo3": "DeviceID:0;Model:0;Name:0",
              "Wifiinfo6": "DeviceID:0;Model:0;Name:0",
              "Wifiinfo4": "DeviceID:0;Model:0;Name:0",
              "Wifiinfo5": "DeviceID:0;Model:0;Name:0",
              "Wifiinfo7": "DeviceID:0;Model:0;Name:0",
              "Wifiinfo8": "DeviceID:0;Model:0;Name:0",
              "Wifiinfo9": "DeviceID:0;Model:0;Name:0"
          }
      },
      {
          "sScheS": {
              "ScheduleEnable": 1,
              "CoolSchedule2": "58ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "CoolSchedule1": "5801ffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ddffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffff",
              "CoolSchedule3": "58ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule1": "0f000700250020001800ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              "HeatSchedule2": "0fffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule3": "0fffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd"
          },
          "data": {
              "DeviceType": 100,
              "Endpoint": 9,
              "UniID": "001e5e090905417c"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370012002a",
              "DeviceSubType": 66,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e090905417c",
              "ModelIdentifier_i": "SQ610RFNH(WB)",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e090905417c",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "231228",
              "FirmwareVersion": "00000047",
              "ShortID_d": 27378,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Wohnzimmer\", \"ShortID_d\": 27378}"
          },
          "sIT600D": {
              "DeviceIndex": 32,
              "SyncResponseVersion_d": "00000047",
              "ConnectType_i": 1
          },
          "sBasicS": {
              "ModelIdentifier": "SQ610RFNH(WB)",
              "HardwareVersion": "32"
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sEndpt": {
              "DeviceType": 66,
              "Endpoint_i": 9
          },
          "sIT600TH": {
              "LockKey": 0,
              "Status_2_d": "7201010000010500405000000501040027001000060035000500400005000100000001018000000001ff030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "Schedule": "7201010000010500405000000501040027001000060035000500400005000100000001018000000001ff030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "HeatingControl": 1,
              "Error23": 0,
              "OUTSensorProbe": 0,
              "SystemMode_a": 4,
              "MaxCoolSetpoint_x100": 4000,
              "HoldType": 0,
              "MinCoolSetpoint_x100": 500,
              "MaxHeatSetpoint_x100": 3500,
              "Error25": 0,
              "Error06": 0,
              "MaxHeatSetpoint_x100_a": 3500,
              "CoolingSetpoint_x100_a": 1800,
              "OUTSensorType": 0,
              "CloudOverride": 0,
              "CoolingControl": 0,
              "LocalTemperature_x100": 2100,
              "Error03": 0,
              "MinHeatSetpoint_x100": 500,
              "Error08": 0,
              "CoolingSetpoint_x100": 1800,
              "MinCoolSetpoint_x100_a": 500,
              "Error21": 0,
              "TemperatureDisplayMode": 0,
              "Status_d": "71ad0d0021000000011800180024000400003030303000005304ffffffffffffffffffffffff01010374060500405005010460b466380834000000ffffffffffffffffffffffff000007000129",
              "Error04": 0,
              "SystemMode": 4,
              "Error32": 0,
              "ProgramOperationMode": 0,
              "Error01": 0,
              "AutoHeatingSetpoint_x100": 1800,
              "Error02": 0,
              "Error31": 0,
              "Error07": 0,
              "HoldType_a": 0,
              "Error09": 0,
              "Error22": 0,
              "Error24": 0,
              "Error30": 0,
              "HeatingSetpoint_x100": 1800,
              "AutoCoolingSetpoint_x100": 2400,
              "ScheduleType": 1,
              "RunningState": 0,
              "PairedWCNumber": 1,
              "SunnySetpoint_x100": 53,
              "TimeFormat24Hour": 1,
              "PairedTRVShortID": "FFFFFFFFFFFFFFFFFFFFFFFF",
              "HeatingSetpoint_x100_a": 1800,
              "LockKey_a": 0,
              "BatteryLevel": 4
          },
          "sIT600I": {
              "CommandResponse_d": "42323000"
          }
      },
      {
          "sScheS": {
              "ScheduleEnable": 1,
              "CoolSchedule2": "46ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule1": "4d0000001600ffff0500ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              "HeatSchedule2": "4dffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule3": "4dffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "CoolSchedule1": "4601ffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ddffff0500ffff0500ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffff",
              "CoolSchedule3": "46ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd"
          },
          "data": {
              "DeviceType": 100,
              "Endpoint": 9,
              "UniID": "001e5e0909054341"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370012002a",
              "DeviceSubType": 66,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e0909054341",
              "ModelIdentifier_i": "SQ610RFNH(WB)",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e0909054341",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "231228",
              "FirmwareVersion": "00000047",
              "ShortID_d": 64068,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Schlafzimmer \", \"ShortID_d\": 64068}"
          },
          "sIT600D": {
              "DeviceIndex": 32,
              "SyncResponseVersion_d": "00000047",
              "ConnectType_i": 1
          },
          "sBasicS": {
              "ModelIdentifier": "SQ610RFNH(WB)",
              "HardwareVersion": "32"
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sEndpt": {
              "DeviceType": 66,
              "Endpoint_i": 9
          },
          "sIT600TH": {
              "LockKey": 0,
              "Status_2_d": "7204010000010500405000000501040027001000060035000500400005000100000001018000000007fe030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "Schedule": "7204010000010500405000000501040027001000060035000500400005000100000001018000000007fe030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "HeatingControl": 1,
              "Error23": 0,
              "OUTSensorProbe": 0,
              "SystemMode_a": 4,
              "MaxCoolSetpoint_x100": 4000,
              "HoldType": 0,
              "MinCoolSetpoint_x100": 500,
              "MaxHeatSetpoint_x100": 3500,
              "Error25": 0,
              "Error06": 0,
              "MaxHeatSetpoint_x100_a": 3500,
              "CoolingSetpoint_x100_a": 1600,
              "OUTSensorType": 0,
              "CloudOverride": 0,
              "CoolingControl": 0,
              "LocalTemperature_x100": 1850,
              "Error03": 0,
              "MinHeatSetpoint_x100": 500,
              "Error08": 0,
              "CoolingSetpoint_x100": 1600,
              "MinCoolSetpoint_x100_a": 500,
              "Error21": 0,
              "TemperatureDisplayMode": 0,
              "Status_d": "f1c80d0018500000011600160024000400003030303000006205ffffffffffffffffffffffff010103830605004050050104d0d013e94256000000ffffffffffffffffffffffff000000000129",
              "Error04": 0,
              "SystemMode": 4,
              "Error32": 0,
              "ProgramOperationMode": 0,
              "Error01": 0,
              "AutoHeatingSetpoint_x100": 1600,
              "Error02": 0,
              "Error31": 0,
              "Error07": 0,
              "HoldType_a": 0,
              "Error09": 0,
              "Error22": 0,
              "Error24": 0,
              "Error30": 0,
              "HeatingSetpoint_x100": 1600,
              "AutoCoolingSetpoint_x100": 2400,
              "ScheduleType": 1,
              "RunningState": 0,
              "PairedWCNumber": 2,
              "SunnySetpoint_x100": 62,
              "TimeFormat24Hour": 1,
              "PairedTRVShortID": "FFFFFFFFFFFFFFFFFFFFFFFF",
              "HeatingSetpoint_x100_a": 1600,
              "LockKey_a": 0,
              "BatteryLevel": 4
          },
          "sIT600I": {
              "CommandResponse_d": "42323000",
              "LastMessageLQI_d": 216,
              "LastMessageRSSI_d": -46
          }
      },
      {
          "data": {
              "DeviceType": 100,
              "Endpoint": 8,
              "UniID": "001e5e09090253d8"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370014",
              "DeviceSubType": 0,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e09090253d8",
              "ModelIdentifier_i": "it600WC",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e09090253d8",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "211006",
              "FirmwareVersion": "20230222",
              "ShortID_d": 23407,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Verteiler Dachgeschoss\", \"ShortID_d\": 23407}"
          },
          "sIT600D": {
              "DeviceIndex": 3,
              "SyncResponseVersion_d": "20230222",
              "ConnectType_i": 255
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sBasicS": {
              "ManufactureName": "Computime",
              "ModelIdentifier": "it600WC",
              "HardwareVersion": "1"
          },
          "sEndpt": {
              "DeviceType": 0,
              "Endpoint_i": 8
          },
          "sIT600I": {
              "CommandResponse_d": "423730000000000008ffbe086ef108396f08ffff00ffff00ffff00ffff00ffff00ffff00ffff00ffff00ffff00ffce007eaaaaa8800000001478",
              "LastMessageLQI_d": 255,
              "LastMessageRSSI_d": -50
          },
          "sIT600WC": {
              "Error11": 0,
              "Error27": 0,
              "Error16": 0,
              "ErrorCodeWC_d": "0000",
              "Error10": 0,
              "Error18": 0,
              "Error20": 0,
              "Error17": 0,
              "Error12": 0,
              "Error26": 0,
              "Error15": 0,
              "Error13": 0,
              "Error14": 0,
              "Error19": 0,
              "Error28": 0,
              "Error29": 0
          }
      },
      {
          "sScheS": {
              "ScheduleEnable": 1,
              "CoolSchedule2": "38ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "CoolSchedule1": "38010600240023002600ffff2100ffff2100ffff1800ffff2100dd0600240023002600ffff2100ffff2100ffff1800ffff2100ffffffffffffffffffffffff",
              "CoolSchedule3": "38ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule1": "09000700250020001800ffff0500ffff0500ffff0500ffff0500ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              "HeatSchedule3": "09ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd",
              "HeatSchedule2": "09ffffffffffffffffffffffffffffffffffffffffffffffffddffffffffffffffffffffffffffffffffffffffffffffffffdd"
          },
          "data": {
              "DeviceType": 100,
              "Endpoint": 9,
              "UniID": "001e5e09090545c2"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370012002a",
              "DeviceSubType": 66,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e09090545c2",
              "ModelIdentifier_i": "SQ610RFNH(WB)",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e09090545c2",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "231228",
              "FirmwareVersion": "00000047",
              "ShortID_d": 34111,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Esszimmer\", \"ShortID_d\": 34111}"
          },
          "sIT600D": {
              "DeviceIndex": 32,
              "SyncResponseVersion_d": "00000047",
              "ConnectType_i": 1
          },
          "sBasicS": {
              "ModelIdentifier": "SQ610RFNH(WB)",
              "HardwareVersion": "32"
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sEndpt": {
              "DeviceType": 66,
              "Endpoint_i": 9
          },
          "sIT600TH": {
              "LockKey": 0,
              "Status_2_d": "7201010000010500405000010501040027001000060035000500400005000100000001018000000001ff030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "Schedule": "7201010000010500405000010501040027001000060035000500400005000100000001018000000001ff030000000100ffffffffffffffffffffffffffffffffffffffffffffffffffffff0000",
              "HeatingControl": 1,
              "Error23": 0,
              "OUTSensorProbe": 0,
              "SystemMode_a": 4,
              "MaxCoolSetpoint_x100": 4000,
              "HoldType": 0,
              "MinCoolSetpoint_x100": 500,
              "MaxHeatSetpoint_x100": 3500,
              "Error25": 0,
              "Error06": 0,
              "MaxHeatSetpoint_x100_a": 3500,
              "CoolingSetpoint_x100_a": 1800,
              "OUTSensorType": 0,
              "CloudOverride": 0,
              "CoolingControl": 1,
              "LocalTemperature_x100": 2070,
              "Error03": 0,
              "MinHeatSetpoint_x100": 500,
              "Error08": 0,
              "CoolingSetpoint_x100": 1800,
              "MinCoolSetpoint_x100_a": 500,
              "Error21": 0,
              "TemperatureDisplayMode": 0,
              "Status_d": "71fe0d0020700000011800180024000400003030303000005604ffffffffffffffffffffffff010103760605004050050104acc713e90839000000ffffffffffffffffffffffff000001000129",
              "Error04": 0,
              "SystemMode": 4,
              "Error32": 0,
              "ProgramOperationMode": 0,
              "Error01": 0,
              "AutoHeatingSetpoint_x100": 1800,
              "Error02": 0,
              "Error31": 0,
              "Error07": 0,
              "HoldType_a": 0,
              "Error09": 0,
              "Error22": 0,
              "Error24": 0,
              "Error30": 0,
              "HeatingSetpoint_x100": 1800,
              "AutoCoolingSetpoint_x100": 2400,
              "ScheduleType": 1,
              "RunningState": 0,
              "PairedWCNumber": 1,
              "SunnySetpoint_x100": 56,
              "TimeFormat24Hour": 1,
              "PairedTRVShortID": "FFFFFFFFFFFFFFFFFFFFFFFF",
              "HeatingSetpoint_x100_a": 1800,
              "LockKey_a": 0,
              "BatteryLevel": 4
          },
          "sIT600I": {
              "CommandResponse_d": "42323000"
          }
      },
      {
          "data": {
              "DeviceType": 100,
              "Endpoint": 8,
              "UniID": "001e5e0909024971"
          },
          "sZDOInfo": {
              "JoinConfigEnd": 1,
              "OnlineStatus_i": 1
          },
          "DeviceL": {
              "DeviceType": 100,
              "AttributeList": "000100100008000b000300110005000a00280033003400370014",
              "DeviceSubType": 0,
              "getModelIdentifierFlag_i": 1,
              "UnquieID": "001e5e0909024971",
              "ModelIdentifier_i": "it600WC",
              "DeviceEndpointNum_i": 1
          },
          "sOTA": {
              "OTAStatus_d": 0
          },
          "sZDO": {
              "MACAddress": "001e5e0909024971",
              "ProtocalType_i": 1,
              "JoinConfigVersion_i": "211006",
              "FirmwareVersion": "20230222",
              "ShortID_d": 26168,
              "LeaveNetwork": 0,
              "LeaveRequest_d": 0,
              "DeviceName": "{\"deviceName\": \"Verteiler EG\", \"ShortID_d\": 26168}"
          },
          "sIT600D": {
              "DeviceIndex": 1,
              "SyncResponseVersion_d": "20230222",
              "ConnectType_i": 255
          },
          "sGenSche": {
              "UpdateGenScheStatus": 0
          },
          "sBasicS": {
              "ManufactureName": "Computime",
              "ModelIdentifier": "it600WC",
              "HardwareVersion": "1"
          },
          "sEndpt": {
              "DeviceType": 0,
              "Endpoint_i": 8
          },
          "sIT600I": {
              "CommandResponse_d": "4237300000000000086af208853f0852ca08de6208ffff00ffff00ffff00ffff00ffff00ffff00ffff00ffff00ffd5007eaaaaa8800000003078",
              "LastMessageLQI_d": 255,
              "LastMessageRSSI_d": -43
          },
          "sIT600WC": {
              "Error11": 0,
              "Error27": 0,
              "Error16": 0,
              "ErrorCodeWC_d": "0000",
              "Error10": 0,
              "Error18": 0,
              "Error20": 0,
              "Error17": 0,
              "Error12": 0,
              "Error26": 0,
              "Error15": 0,
              "Error13": 0,
              "Error14": 0,
              "Error19": 0,
              "Error28": 0,
              "Error29": 0
          }
      }
  ],
  "status": "success"
};