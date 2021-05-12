import { Selector } from 'testcafe';

class SellPage {
  constructor() {
    this.pageId = '#sell-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Sell an item */
  async sellItem(testController, pName, pImage, pDes) {
    await this.isDisplayed(testController);
    await testController.typeText('#sell-item-name', pName);
    await testController.typeText('#sell-item-image', pImage);
    await testController.typeText('#sell-item-description', pDes);
    await testController.click('#sell-item-submit');
  }
}

export const sellPage = new SellPage();
