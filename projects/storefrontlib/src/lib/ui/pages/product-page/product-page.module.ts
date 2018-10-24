import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductGuard } from '../../../product/guards/product.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ProductDetailsPageLayoutModule } from '../../layout/product-details-page-layout/product-details-page-layout.module';
import { ProductPageComponent } from './product-page.component';

const routes: Routes = [
  {
    path: '__cx-config__product', // todo spike old: 'product/:productCode',
    canActivate: [ProductGuard, CmsPageGuards],
    component: ProductPageComponent
  },
  {
    path:
      'Open-Catalogue/:category1/:category2/:category3/:category4/p/:productCode',
    redirectTo: '__cx-config__product' // todo spike old: 'product/:productCode',
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductDetailsPageLayoutModule
  ],
  declarations: [ProductPageComponent],
  exports: [ProductPageComponent]
})
export class ProductPageModule {}
