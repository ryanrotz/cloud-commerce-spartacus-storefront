import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PathPipe } from './path.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class ConfigurableRoutes {
  declarations: [PathPipe];
}
