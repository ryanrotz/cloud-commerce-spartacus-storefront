import { Component } from '@angular/core';
import { PathService } from '@spartacus/core';

@Component({
  selector: 'y-tertiary-bar',
  templateUrl: './tertiary-bar.component.html',
  styleUrls: ['./tertiary-bar.component.scss']
})
export class TertiaryBarComponent {
  constructor(private pathService: PathService) {}

  tertiaryNavItems: any[] = [
    {
      label: 'Sale',
      url: this.pathService.transform('sale')
    },
    {
      label: 'Contact us',
      url: this.pathService.transform('contact')
    },
    {
      label: 'Help',
      url: this.pathService.transform('help')
    }
  ];
}
