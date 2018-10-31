import { Component } from '@angular/core';
import { pageNotFoundImgSrc } from '../../images/pageNotFound';
import { PathService } from '@spartacus/core';

@Component({
  selector: 'y-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss']
})
export class PageNotFoundComponent {
  constructor(private pathService: PathService) {}
  pageNotFoundImgSrc = pageNotFoundImgSrc;
  errorNav = [
    {
      link: this.pathService.transform('homepage'),
      label: 'Homepage'
    },
    {
      link: this.pathService.transform('help'),
      label: 'Frequently Asked Question'
    },
    {
      link: this.pathService.transform('cart'),
      label: 'Cart'
    }
  ];
}
