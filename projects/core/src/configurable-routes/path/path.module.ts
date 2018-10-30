import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PathPipe } from './path.pipe';
import { PathService } from './path.service';

@NgModule({
  imports: [CommonModule],
  declarations: [PathPipe],
  exports: [PathPipe],
  providers: [PathService] // spike todo: consider if not to many instances of PathService will be created
})
export class PathModule {}
