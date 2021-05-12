import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  /** go to sell page. */
  async gotoSellPage(testController) {
    await testController.click('#navbar-sell-page');
  }

  /** go to review page. */
  async gotoReviewPage(testController) {
    await testController.click('#navbar-review-page');
  }

  /** go to profile page. */
  async gotoProfilePage(testController) {
    await testController.click('#navbar-profile-page');
  }

  /** go to Community page. */
  async gotoComPage(testController) {
    await testController.click('#navbar-community-page');
  }

  /** go to shop page. */
  async gotoShopPage(testController) {
    await testController.click('#navbar-shop-page');
  }
}

export const navBar = new NavBar();
