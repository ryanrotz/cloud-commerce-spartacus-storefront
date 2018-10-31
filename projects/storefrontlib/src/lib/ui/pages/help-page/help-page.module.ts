import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HelpPageComponent } from './help-page.component';
import { HelpPageLayoutModule } from '../../layout/help-page-layout/help-page-layout.module';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: HelpPageComponent,
    data: {
      // TODO:
      // When 'help page' is implemented in CMS backend,
      // then 'faq' pageLabel should be changed to adequate one
      pageLabel: 'faq',
      cxConfigurable: { path: 'help' }
    }
  }
];

@NgModule({
  imports: [CommonModule, HelpPageLayoutModule, RouterModule.forChild(routes)],
  declarations: [HelpPageComponent],
  exports: [HelpPageComponent]
})
export class HelpPageModule {}
