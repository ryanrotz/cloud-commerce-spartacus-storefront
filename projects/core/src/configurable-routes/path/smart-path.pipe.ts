import { Pipe, PipeTransform } from '@angular/core';
import { PathService } from './path.service';

interface DataFacade {
  getForLink: (essentialParameters: any) => any;
}

const mockProductFacade: DataFacade = {
  getForLink: essentialParameters => ({
    productCode: essentialParameters.productCode,
    promotionCode: `Promotion-code-${Math.random()}`
  })
};

@Pipe({
  name: 'cxSmartPath',

  // tslint:disable-next-line:max-line-length
  // spike todo - consider if we want rerender it on every change detection cycle (due to dependency on the state of routes configuration) or only on arguments change
  pure: false
})
export class SmartPathPipe implements PipeTransform {
  constructor(
    private pathService: PathService // + all facades here
  ) {}

  transform([pageName, essentialParameters]: [string, object]): string[] {
    const fullParameters = this.getDataFromFacade(
      pageName,
      essentialParameters
    );
    return this.pathService.transform(pageName, fullParameters);
  }

  private getDataFromFacade(pageName: string, essentialParameters: object) {
    const facade = this.getFacadeInstance(pageName);
    return facade.getForLink(essentialParameters);
  }

  private getFacadeInstance(pageName: string): DataFacade {
    // returns instance of facade based on pageName
    return mockProductFacade;
  }
}
