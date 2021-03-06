import { browser, ElementFinder, by, element } from 'protractor';
import { AppPage } from './app.po';
import { E2EUtil } from '../e2e-util';

export class ProductDetailsPage extends AppPage {
  readonly YPAGE = 'cx-product-page';

  readonly page: ElementFinder = element(by.tagName(this.YPAGE));
  readonly productDetails: ElementFinder = this.page.element(
    by.tagName('cx-product-details')
  );
  readonly productTitle: ElementFinder = this.productDetails.element(
    by.css('.cx-product-details__item-name')
  );
  readonly productCode: ElementFinder = this.productDetails.element(
    by.css('.cx-product-details__item-code')
  );
  readonly addToCartComponent: ElementFinder = this.page.element(
    by.tagName('cx-add-to-cart')
  );
  readonly productSummaryComponent: ElementFinder = this.page.element(
    by.tagName('cx-product-summary')
  );
  readonly productPrice: ElementFinder = this.productSummaryComponent.element(
    by.css('.cx-product-summary__price')
  );
  readonly outOfStockDiv: ElementFinder = this.productSummaryComponent.element(
    by.cssContainingText('span', 'Out of stock')
  );
  readonly addToCartButton: ElementFinder = this.addToCartComponent.element(
    by.tagName('button')
  );
  readonly productQuantitySpan: ElementFinder = this.addToCartComponent.element(
    by.css('span[class="entry-quantity ng-star-inserted"]')
  );
  readonly itemCounterComponent: ElementFinder = this.productDetails.element(
    by.tagName('cx-item-counter')
  );
  readonly itemCounterUpButton: ElementFinder = this.itemCounterComponent
    .all(by.tagName('button'))
    .get(1);

  async navigateTo(productId: string) {
    await browser.get('/product/' + productId);
    await this.waitForReady();
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.page);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async getProductQuantity(): Promise<string> {
    return this.productQuantitySpan.getText();
  }
}
