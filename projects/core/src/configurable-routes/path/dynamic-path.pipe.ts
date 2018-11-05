import { Pipe, PipeTransform } from '@angular/core';
import { DynamicPathService } from './dynamic-path.service';

@Pipe({
  name: 'cxDynamicPath',

  // tslint:disable-next-line:max-line-length
  // spike todo - consider if we want rerender it on every change detection cycle (due to dependency on the state of routes configuration) or only on arguments change
  pure: false
})
export class DynamicPathPipe implements PipeTransform {
  constructor(private dynamicPathService: DynamicPathService) {}

  transform(url: string): string {
    return this.dynamicPathService.transform(url);
  }
}
