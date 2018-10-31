import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { CartPageLayoutModule } from '../../layout/cart-page-layout/cart-page-layout.module';

import { CartPageComponent } from './cart-page.component';
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    data: {
      pageLabel: 'cartPage',
      cxConfigurable: { path: 'cart' }
    },
    component: CartPageComponent
  }
];

@NgModule({
  imports: [CommonModule, CartPageLayoutModule, RouterModule.forChild(routes)],
  declarations: [CartPageComponent],
  exports: [CartPageComponent]
})
export class CartPageModule {}
