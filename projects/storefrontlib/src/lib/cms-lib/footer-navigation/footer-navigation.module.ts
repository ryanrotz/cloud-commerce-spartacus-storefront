import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterNavigationComponent } from './footer-navigation.component';
import { PathModule } from '@spartacus/core';
import { GenericLinkModule } from '../../ui/components/generic-link/generic-link.module';

@NgModule({
  imports: [CommonModule, RouterModule, GenericLinkModule, PathModule],
  declarations: [FooterNavigationComponent],
  entryComponents: [FooterNavigationComponent],
  exports: [FooterNavigationComponent]
})
export class FooterNavigationModule {}
