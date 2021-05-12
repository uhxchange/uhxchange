import { Selector } from 'testcafe';

class ShopPage {
  constructor() {
    this.pageId = '#shop-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const shopPage = new ShopPage();
