import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { ConfigurableRoutesLoader } from './configurable-routes-loader';

function fetchRoutesConfig(loader: ConfigurableRoutesLoader) {
  return () => loader.loadRoutesConfig();
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
      useFactory: fetchRoutesConfig,
      deps: [ConfigurableRoutesLoader],
      multi: true
    }
  ]
})
export class ConfigurableRoutesModule {}
