import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SalePageComponent } from './sale-page.component';
import { SalePageLayoutModule } from '../../layout/sale-page-layout/sale-page-layout.module';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: SalePageComponent,
    data: {
      // TODO:
      // When 'sale page' is implemented in CMS backend,
      // then 'homepage' pageLabel should be changed to adequate one
      pageLabel: 'homepage',
      cxConfigurable: { path: 'sale' }
    }
  }
];

@NgModule({
  imports: [CommonModule, SalePageLayoutModule, RouterModule.forChild(routes)],
  declarations: [SalePageComponent],
  exports: [SalePageComponent]
})
export class SalePageModule {}
