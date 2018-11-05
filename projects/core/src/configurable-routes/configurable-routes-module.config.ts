import { RoutesConfig, defaultRoutesConfig } from './routes-config';

// SPIKE TODO: rename it better:
export abstract class ConfigurableRoutesModuleConfig {
  routesConfig: RoutesConfig;
}

export const defaultConfigurableRoutesModuleConfig = {
  routesConfig: defaultRoutesConfig
};
