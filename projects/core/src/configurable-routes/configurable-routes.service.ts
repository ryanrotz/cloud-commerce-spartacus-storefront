import { Injectable } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import { ServerConfig } from '../config/server-config/server-config';
import { ConfigurableRoutesLoader } from './configurable-routes-loader';
import { RoutesConfig } from './routes-config';

// spike todo: base not the url prefix, but on route metadata (data object)
// convention: '__cx-config__<PAGE_KEY>' path will be mapped to a path configured under <PAGE_KEY>
export const configurablePathPrefix = '__cx-config__';

@Injectable()
export class ConfigurableRoutesService {
  // TODO spike - define other config not to use ServerConfig
  // TODO spike - define here some other
  constructor(
    private readonly config: ServerConfig,
    private readonly router: Router,
    private readonly loader: ConfigurableRoutesLoader // spike TODO add type
  ) {}

  private routesConfig: RoutesConfig;
  private currentLanguageCode: string;

  initRoutes() {
    this.routesConfig = this.loader.routesConfig;
    this.currentLanguageCode = this.routesConfig.defaultLanguage;

    this.changeLanguage(this.currentLanguageCode);
  }

  changeLanguage(languageCode: string) {
    if (!languageCode) {
      languageCode = this.routesConfig.defaultLanguage;
    }
    if (
      !(languageCode in this.routesConfig.translations) &&
      !this.config.production
    ) {
      // spike todo check if it really checks it:
      console.warn(
        `There are no translations in routes config for language code '${languageCode}'.`
      );
    }

    this.currentLanguageCode = languageCode;

    this.router.resetConfig(this.getTranslatedRoutes(this.router.config));
  }

  getPathsForPage(pageName: string): string[] {
    const paths = this.routesConfig.translations[this.currentLanguageCode][
      pageName
    ];
    if (!paths && !this.config.production) {
      // TODO check if it really calls console.warn when pageName does not exist as a key in the config
      console.warn(`No paths were configured for page '${pageName}'!`);
    }
    return paths;
  }

  // TODO: take care also of nested routes and matching them with __cx-config__ prefix
  private getTranslatedRoutes(existingRoutes: Routes): Routes {
    const translatedRoutes = [];
    existingRoutes.forEach(route => {
      // we assume that 'path' and 'redirectTo' cannot be both configurable for one route
      if (this.isConfigurable(route.path)) {
        translatedRoutes.push(...this.configurePath(route));
        return;
      }

      if (this.isConfigurable(route.redirectTo)) {
        translatedRoutes.push(this.configureRedirect(route));
        return;
      }

      // if nothing is configurable, just pass the original route
      translatedRoutes.push(route);
    });
    return translatedRoutes;
  }

  private isConfigurable(path: string): boolean {
    return typeof path === 'string' && path.startsWith(configurablePathPrefix);
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

  // spike todo: find better names for functionsmethods below:
  private getConfiguredPaths(originalPath: string): string[] {
    const pageName = originalPath.replace(configurablePathPrefix, '');
    const paths = this.getPathsForPage(pageName);

    if (paths === undefined && !this.config.production) {
      console.warn(
        `No paths were configured for page '${pageName}' in language '${
          this.currentLanguageCode
        }'!`
      );
    }

    return paths || [originalPath];
  }
}
