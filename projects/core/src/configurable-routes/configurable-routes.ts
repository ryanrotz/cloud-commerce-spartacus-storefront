import { Route } from '@angular/router';
import { ConfigurableRoutePageName } from './configurable-route-page-name';

export interface ConfigurableRoutePath extends Route {
  data: {
    cxConfigurable: {
      path?: ConfigurableRoutePageName;
    };
    [_: string]: any;
  };
}

export interface ConfigurableRouteRedirectTo extends Route {
  data: {
    cxConfigurable: {
      redirectTo?: ConfigurableRoutePageName;
    };
    [_: string]: any;
  };
}

export type ConfigurableRoute =
  | ConfigurableRoutePath
  | ConfigurableRouteRedirectTo;

export type ConfigurableRoutes = ConfigurableRoute[];
