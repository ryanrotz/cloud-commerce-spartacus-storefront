import { Component, OnInit } from '@angular/core';
import { Router, Routes, Route } from '@angular/router';
import { ServerConfig } from '@spartacus/core';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent implements OnInit {
  // TODO spike - define other config not to use ServerConfig
  // TODO spike - move all logic of replacing routes to other place than here
  constructor(private config: ServerConfig, private router: Router) {}

  // convention: '__cx-config__<PAGE_KEY>' path will be mapped to a path configured under <PAGE_KEY>
  readonly configPathPrefix = '__cx-config__';

  ngOnInit() {
    console.log(this.config.routePaths); // spike todo remove
    console.log(this.router.config); // spike todo remove

    const configuredRoutes = this.configureRoutes(this.router.config);
    this.router.resetConfig(configuredRoutes);
    console.log(this.router.config); // spike todo remove
  }

  // TODO: take care also of nested routes and matching them with __cx-config__ prefix
  configureRoutes(existingRoutes: Routes): Routes {
    const configuredRoutes = [];
    existingRoutes.forEach(route => {
      // we assume that 'path' and 'redirectTo' cannot be both configurable for one route
      if (this.isConfigurable(route.path)) {
        configuredRoutes.push(...this.configurePath(route));
      } else if (this.isConfigurable(route.redirectTo)) {
        configuredRoutes.push(this.configureRedirect(route));
      } else {
        configuredRoutes.push(route);
      }
    });
    return configuredRoutes;
  }

  private isConfigurable(path: string): boolean {
    return typeof path === 'string' && path.startsWith(this.configPathPrefix);
  }

  private configurePath(route: Route): Route[] {
    return this.getConfiguredPaths(route.path).map(configuredPath =>
      Object.assign({}, route, { path: configuredPath })
    );
  }

  private configureRedirect(route: Route): Route {
    const redirectCandidates = this.getConfiguredPaths(route.redirectTo);
    const newRedirect = redirectCandidates[0]; // get the first candidate by convention
    return Object.assign({}, route, { redirectTo: newRedirect });
  }

  private getConfiguredPaths(originalPath: string): string[] {
    const pageName = originalPath.replace(this.configPathPrefix, '');
    const configuredPaths = this.config.routePaths[pageName];
    if (configuredPaths === undefined && !this.config.production) {
      console.warn(`No paths were configured for page '${pageName}'!`);
    }
    return configuredPaths;
  }
}
