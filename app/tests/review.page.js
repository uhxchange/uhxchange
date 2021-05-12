import { Selector } from 'testcafe';

class ReviewPage {
  constructor() {
    this.pageId = '#review-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Sell an item */
  async writeReview(testController, review) {
    await this.isDisplayed(testController);
    await testController.typeText('#review-page-userReview', review);
    await testController.click('#review-page-userReview-submit');
  }
}

export const reviewPage = new ReviewPage();
