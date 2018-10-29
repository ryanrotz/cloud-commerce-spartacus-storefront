import { Component, OnInit } from '@angular/core';
import { ConfigurableRoutesService } from 'projects/core/src/configurable-routes/configurable-routes.service';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss']
})
export class StorefrontComponent implements OnInit {
  constructor(private configurableRoutesService: ConfigurableRoutesService) {}

  ngOnInit() {
    this.configurableRoutesService.initRoutes();
  }
}
