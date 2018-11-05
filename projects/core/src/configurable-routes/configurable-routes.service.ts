import { Injectable } from '@angular/core';
import { Routes, Router, Route } from '@angular/router';
import { ServerConfig } from '../config/server-config/server-config';
import { ConfigurableRoutesLoader } from './configurable-routes-loader';
import {
  defaultRoutesConfig,
  ParameterNamesMapping,
  defaultRoutesTranslations,
  defaultParameterNamesMapping
} from './routes-config';
import { RoutesTranslations } from './routes-translations';

type ConfigurableRouteKey = 'path' | 'redirectTo';

@Injectable()
export class ConfigurableRoutesService {
  constructor(
    private readonly config: ServerConfig,
    private readonly router: Router,
    private readonly loader: ConfigurableRoutesLoader
  ) {}

  private routesTranslations: RoutesTranslations;
  private currentRoutesTranslations: RoutesTranslations;
  private parameterNamesMapping: ParameterNamesMapping;
  private currentLanguageCode: string;

  initRoutes() {
    const {
      translations,
      defaultLanguage,
      parameterNamesMapping
    } = this.loader.routesConfig;

    this.currentLanguageCode = defaultLanguage; // spike TODO init it with language from facade (ngrx)
    this.routesTranslations = translations;
    this.parameterNamesMapping = Object.assign(
      {},
      defaultParameterNamesMapping,
      parameterNamesMapping
    );

    this.changeLanguage(this.currentLanguageCode);
  }

  changeLanguage(languageCode: string) {
    if (this.routesTranslations[languageCode] === undefined) {
      if (!this.config.production) {
        // spike todo check if it really checks it:
        console.warn(
          `There are no translations in routes config for language code '${languageCode}'.`
        );
      }
      return;
    }

    this.currentLanguageCode = languageCode;
    const newTranslations = this.routesTranslations[languageCode];
    this.currentRoutesTranslations = Object.assign(
      {},
      defaultRoutesTranslations,
      newTranslations
    );

    this.router.resetConfig(this.translateRoutes(this.router.config));
  }

  getPathsForPage(pageName: string): string[] {
    const paths = this.currentRoutesTranslations[pageName];
    if (paths === undefined && !this.config.production) {
      console.warn(
        `No paths were configured for page '${pageName}' in language '${
          this.currentLanguageCode
        }'!`
      );
    }
    return paths;
  }

  getParameterNamesMapping(pageName: string): object {
    return this.parameterNamesMapping[pageName] || {};
  }

  // TODO: take care also of nested routes
  private translateRoutes(routes: Routes): Routes {
    const translatedRoutes = [];
    routes.forEach(route => {
      // we assume that 'path' and 'redirectTo' cannot be both configurable for one route
      if (this.isConfigurable(route, 'path')) {
        translatedRoutes.push(...this.translatePath(route));
        return;
      }

      if (this.isConfigurable(route, 'redirectTo')) {
        translatedRoutes.push(this.translateRedirectTo(route));
        return;
      }

      translatedRoutes.push(route); // if nothing is configurable, just pass the original route
    });
    return translatedRoutes;
  }

  private isConfigurable(route: Route, key: ConfigurableRouteKey): boolean {
    return !!this.getConfigurable(route, key);
  }

  private getConfigurable(route: Route, key: ConfigurableRouteKey): string {
    return (
      route.data && route.data.cxConfigurable && route.data.cxConfigurable[key]
    );
  }

  private translatePath(route: Route): Route[] {
    return this.getConfiguredPaths(route, 'path').map(translatedPath =>
      Object.assign({}, route, { path: translatedPath })
    );
  }

  private translateRedirectTo(route: Route): Route {
    const translatedPaths = this.getConfiguredPaths(route, 'redirectTo');
    const newRedirectTo = translatedPaths[0]; // get the first path from list by convention
    return Object.assign({}, route, { redirectTo: newRedirectTo });
  }

  private getConfiguredPaths(
    route: Route,
    key: ConfigurableRouteKey
  ): string[] {
    const pageName = this.getConfigurable(route, key);
    const paths = this.getPathsForPage(pageName);
    const originalPath = route[key];

    return paths === undefined ? [originalPath] : paths;
  }
}
