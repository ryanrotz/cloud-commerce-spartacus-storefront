import { Component, OnInit } from '@angular/core';
import { PathService } from '@spartacus/core';

@Component({
  selector: 'y-tertiary-bar',
  templateUrl: './tertiary-bar.component.html',
  styleUrls: ['./tertiary-bar.component.scss']
})
export class TertiaryBarComponent implements OnInit {
  constructor(private pathService: PathService) {}

  tertiaryNavItems: { url: string; label: string }[];

  ngOnInit(): void {
    this.tertiaryNavItems = [
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
}
