/* eslint-disable @typescript-eslint/no-explicit-any */
import { API, Logger, PlatformAccessory, PlatformConfig } from 'homebridge';
import { SalusSQ610HomebridgePlatform } from '../platform';
import { PLATFORM_NAME, PLUGIN_NAME } from '../settings';
import nock from 'nock';
import fs from 'fs';

// Mock the platform accessory
jest.mock('../platformAccessory');

describe('SalusSQ610HomebridgePlatform', () => {
  let platform: SalusSQ610HomebridgePlatform;
  let api: API;
  let log: Logger;
  let config: PlatformConfig;
  let registeredAccessories: PlatformAccessory[];
  let unregisteredAccessories: PlatformAccessory[];

  const ip_address = '192.168.0.111';
  const eu_id = '0000000000000000';
  const responseBytes = fs.readFileSync('./src/__tests__/gw_response');

  beforeEach(() => {
    registeredAccessories = [];
    unregisteredAccessories = [];

    // Mock logger
    log = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    } as unknown as Logger;

    // Mock API
    api = {
      hap: {
        uuid: {
          generate: (id: string) => `uuid-${id}`,
        },
        Service: {},
        Characteristic: {},
      },
      on: jest.fn((event: string, callback: () => void) => {
        if (event === 'didFinishLaunching') {
          // Store the callback but don't execute it automatically
          (api as any).didFinishLaunchingCallback = callback;
        }
      }),
      platformAccessory: class MockPlatformAccessory {
        UUID: string;
        displayName: string;
        context: any;
        constructor(displayName: string, uuid: string) {
          this.displayName = displayName;
          this.UUID = uuid;
          this.context = {};
        }
      },
      registerPlatformAccessories: jest.fn((pluginName: string, platformName: string, accessories: PlatformAccessory[]) => {
        registeredAccessories.push(...accessories);
      }),
      unregisterPlatformAccessories: jest.fn((pluginName: string, platformName: string, accessories: PlatformAccessory[]) => {
        unregisteredAccessories.push(...accessories);
      }),
      updatePlatformAccessories: jest.fn(),
    } as unknown as API;

    // Mock config
    config = {
      platform: PLATFORM_NAME,
      ip_address,
      eu_id,
    } as PlatformConfig;

    platform = new SalusSQ610HomebridgePlatform(log, config, api);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should register new accessories when discovering devices', async () => {
    nock(`http://${ip_address}:80`)
      .post('/deviceid/read')
      .reply(200, Buffer.from(responseBytes));

    // Trigger device discovery
    await (api as any).didFinishLaunchingCallback();

    // Wait a bit for async operations
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(registeredAccessories.length).toBe(10);
    expect(unregisteredAccessories.length).toBe(0);
  });

  it('should unregister accessories that are no longer present', async () => {
    // Add cached accessories that will NOT be in the discovered devices
    const cachedAccessory1 = new (api as any).platformAccessory('Removed Device', 'uuid-removed-device-123') as PlatformAccessory;
    const cachedAccessory2 = new (api as any).platformAccessory('Another Removed', 'uuid-another-removed-456') as PlatformAccessory;
    platform.configureAccessory(cachedAccessory1);
    platform.configureAccessory(cachedAccessory2);

    nock(`http://${ip_address}:80`)
      .post('/deviceid/read')
      .reply(200, Buffer.from(responseBytes));

    // Trigger device discovery
    await (api as any).didFinishLaunchingCallback();

    // Wait a bit for async operations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should register 10 new accessories
    expect(registeredAccessories.length).toBe(10);
    
    // Should unregister the 2 cached accessories that were not discovered
    expect(unregisteredAccessories.length).toBe(2);
    expect(unregisteredAccessories).toContainEqual(cachedAccessory1);
    expect(unregisteredAccessories).toContainEqual(cachedAccessory2);
    
    // Verify unregisterPlatformAccessories was called with correct parameters
    expect(api.unregisterPlatformAccessories).toHaveBeenCalledWith(PLUGIN_NAME, PLATFORM_NAME, [cachedAccessory1]);
    expect(api.unregisterPlatformAccessories).toHaveBeenCalledWith(PLUGIN_NAME, PLATFORM_NAME, [cachedAccessory2]);
  });

  it('should not unregister accessories that are still present', async () => {
    // Add a cached accessory with a UUID that won't match any discovered device
    const cachedAccessory = new (api as any).platformAccessory('ToRemove', 'uuid-not-found') as PlatformAccessory;
    platform.configureAccessory(cachedAccessory);

    nock(`http://${ip_address}:80`)
      .post('/deviceid/read')
      .reply(200, Buffer.from(responseBytes));

    // Trigger device discovery
    await (api as any).didFinishLaunchingCallback();

    // Wait a bit for async operations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should register all 10 new accessories  
    expect(registeredAccessories.length).toBe(10);
    
    // Should unregister only the 1 accessory not in discovery
    expect(unregisteredAccessories.length).toBe(1);
    expect(unregisteredAccessories).toContainEqual(cachedAccessory);
  });
});
