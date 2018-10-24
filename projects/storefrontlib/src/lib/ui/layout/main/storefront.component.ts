import { Component, OnInit } from '@angular/core';
import { Router, Routes, Route } from '@angular/router';
import { AuthModuleConfig } from '../../../auth/auth-module.config';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent implements OnInit {
  // TODO spike - define other config not to use AuthModuleConfig
  // TODO spike - move all logic of replacing routes to other place than here
  constructor(private config: AuthModuleConfig, private router: Router) {}

  // convention: '__cx-config__<PAGE_KEY>' path will be mapped to a path configured under <PAGE_KEY>
  readonly configurablePathPrefix = '__cx-config__';

  ngOnInit() {
    console.log(this.config.routePaths); // spike todo remove
    console.log(this.router.config); // spike todo remove

    const configuredRoutes = this.configurePaths(
      this.config.routePaths,
      this.router.config
    );
    this.router.resetConfig(configuredRoutes);
    console.log(this.router.config); // spike todo remove
  }

  // TODO: take care also of nested routes and matching them with __cx-config__ prefix
  configurePaths(
    routePathsConfig: AuthModuleConfig['routePaths'],
    existingRoutes: Routes
  ): Routes {
    return existingRoutes.map(route => {
      this.configurePath(route, 'path', routePathsConfig);
      this.configurePath(route, 'redirectTo', routePathsConfig);
      return route;
    });
  }

  configurePath(
    route: Route,
    key: 'path' | 'redirectTo',
    routePathsConfig: AuthModuleConfig['routePaths']
  ) {
    const path = route[key];
    if (
      typeof path === 'string' &&
      path.startsWith(this.configurablePathPrefix)
    ) {
      const configurablePathKey = path.replace(this.configurablePathPrefix, '');
      const configuredPath = routePathsConfig[configurablePathKey];

      if (configuredPath === undefined) {
        if (!this.config.production) {
          console.warn(`No path was configured for '${path}'!`);
        }
      } else {
        route[key] = configuredPath;
      }
    }
    return route;
  }
}
