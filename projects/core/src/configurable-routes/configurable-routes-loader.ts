import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../config/server-config/server-config';
import { Injectable } from '@angular/core';
import { RoutesConfig, defaultRoutesConfig } from './routes-config';

@Injectable()
export class ConfigurableRoutesLoader {
  private _routesConfig: RoutesConfig;

  get routesConfig(): RoutesConfig {
    return this._routesConfig;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly config: ServerConfig
  ) {}

  loadRoutesConfig(): Promise<RoutesConfig> {
    const url = this.config.server.routesConfigUrl;
    return url ? this.fetchRoutesConfig(url) : this.getDefaultRoutesConfig();
  }

  private fetchRoutesConfig(url: string): Promise<RoutesConfig> {
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res: RoutesConfig) => {
          this._routesConfig = res;
          return resolve(res);
        },
        // spike todo check if it is descriptive enough
        () => reject(`Could not get routes configutation from url ${url}!`)
      );
    });
  }

  private getDefaultRoutesConfig(): Promise<RoutesConfig> {
    this._routesConfig = defaultRoutesConfig;
    return Promise.resolve(defaultRoutesConfig);
  }
}
