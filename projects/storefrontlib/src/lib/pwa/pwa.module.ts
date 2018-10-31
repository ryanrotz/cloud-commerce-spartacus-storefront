import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Config, ConfigModule } from '@spartacus/core';

import { defaultPWAModuleConfig, PWAModuleConfig } from './pwa.module-config';

import { AddToHomeScreenBtnComponent } from './add-to-home-screen-btn/add-to-home-screen-btn.component';
import { ɵangular_packages_service_worker_service_worker_b as RegistrationOptions } from '@angular/service-worker';

export function pwaFunction(pwaConfig: PWAModuleConfig): RegistrationOptions {
  console.log('>>>>>>>>>>>>>>>', pwaConfig);
  return { enabled: pwaConfig.pwa.enabled };
}

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(defaultPWAModuleConfig),
    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [
    { provide: PWAModuleConfig, useExisting: Config },
    {
      provide: RegistrationOptions,
      useFactory: pwaFunction,
      deps: [Config]
    }
  ],
  declarations: [AddToHomeScreenBtnComponent],
  exports: [AddToHomeScreenBtnComponent]
})
export class PwaModule {}
