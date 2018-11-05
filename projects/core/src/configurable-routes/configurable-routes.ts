import { Route } from '@angular/router';

export interface ConfigurableRoutePath extends Route {
  data: {
    cxConfigurable: {
      path?: string;
    };
    [_: string]: any;
  };
}

export interface ConfigurableRouteRedirectTo extends Route {
  data: {
    cxConfigurable: {
      redirectTo?: string;
    };
    [_: string]: any;
  };
}

export type ConfigurableRoute =
  | ConfigurableRoutePath
  | ConfigurableRouteRedirectTo;

export type ConfigurableRoutes = ConfigurableRoute[];
