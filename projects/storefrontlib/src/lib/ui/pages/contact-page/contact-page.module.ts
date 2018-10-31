import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ContactPageLayoutModule } from '../../layout/contact-page-layout/contact-page-layout.module';
import { ContactPageComponent } from './contact-page.component';
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: ContactPageComponent,
    data: {
      // TODO:
      // When 'contact page' is implemented in CMS backend,
      // then 'homepage' pageLabel should be changed to adequate one
      pageLabel: 'homepage',
      cxConfigurable: { path: 'contact' }
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ContactPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactPageComponent],
  exports: [ContactPageComponent]
})
export class ContactPageModule {}
