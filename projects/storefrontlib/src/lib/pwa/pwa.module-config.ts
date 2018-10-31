import { ServerConfig } from '@spartacus/core';

export abstract class PWAModuleConfig extends ServerConfig {
  pwa?: {
    addToHomeScreen?: boolean;
    enabled?: boolean;
  };
}

export const defaultPWAModuleConfig: PWAModuleConfig = {
  pwa: {
    addToHomeScreen: false,
    enabled: false
  }
};
