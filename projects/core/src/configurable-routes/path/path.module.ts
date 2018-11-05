import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PathPipe } from './path.pipe';
import { PathService } from './path.service';
import { DynamicPathPipe } from './dynamic-path.pipe';
import { DynamicPathService } from './dynamic-path.service';

@NgModule({
  imports: [CommonModule],
  declarations: [PathPipe, DynamicPathPipe],
  exports: [PathPipe, DynamicPathPipe],
  providers: [PathService, DynamicPathService] // spike todo: consider if not to many instances of those will be created
})
export class PathModule {}
