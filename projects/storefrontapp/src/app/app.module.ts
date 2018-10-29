import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StorefrontModule, StorefrontComponent } from '@spartacus/storefront';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { CustomComponent } from './custom/custom.component';

const devImports = [];

if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

const routes: Routes = [
  {
    path: 'custom',
    component: CustomComponent
  }
];

// spike todo remove:
@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ClientRouting {}

@NgModule({
  imports: [
    BrowserModule,
    ClientRouting, // spike todo remove it
    StorefrontModule.withConfig({
      server: {
        baseUrl: environment.occBaseUrl,
        routesConfigUrl: environment.routesConfigUrl // spike todo remove
      }
    }),

    ...devImports
  ],
  bootstrap: [StorefrontComponent],
  declarations: [CustomComponent]
})
export class AppModule {}
