import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { ConfigurableRoutesLoader } from './configurable-routes-loader';

export function loadRoutesConfig(loader: ConfigurableRoutesLoader) {
  const result = () => loader.loadRoutesConfig(); // this assignment is a workaround for AOT compilation
  return result;
}

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [
    ConfigurableRoutesService,
    ConfigurableRoutesLoader,
    {
      provide: APP_INITIALIZER,
      useFactory: loadRoutesConfig,
      deps: [ConfigurableRoutesLoader],
      multi: true
    }
  ]
})
export class ConfigurableRoutesModule {}
