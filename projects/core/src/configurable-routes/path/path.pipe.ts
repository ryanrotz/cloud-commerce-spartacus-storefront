import { Pipe, PipeTransform } from '@angular/core';
import { PathService } from './path.service';

@Pipe({
  name: 'cxPath',

  // tslint:disable-next-line:max-line-length
  // spike todo - consider if we want rerender it on every change detection cycle (due to dependency on the state of routes configuration) or only on arguments change
  pure: false
})
export class PathPipe implements PipeTransform {
  constructor(private pathService: PathService) {}

  transform([pageName, parametersObject]: [string, object]): string[] {
    return this.pathService.transform(pageName, parametersObject);
  }
}
