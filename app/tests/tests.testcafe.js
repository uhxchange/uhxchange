import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { sellPage } from './sell.page';
import { reviewPage } from './review.page';
import { myProfilePage } from './myProfile.page';
import { comPage } from './community.page';
import { shopPage } from './shop.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'admin@foo.com', password: 'changeme' };
const newCred = {
  name: 'Tam Nguyen',
  image: 'https://www.denofgeek.com/wp-content/uploads/2014/06/skeletor.jpg?fit=620%2C368',
  num: '8086738888',
  email: 'ntam@ymail.com',
  password: 'changeme',
};
const testCred = {
  email: 'tam9@hawaii.edu',
  password: 'changeme',
};
const item = {
  name: 'Laptop',
  image: 'http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg',
  description: 'This is an old, used laptop. I am putting this up for sale for atleast 500 Dollars or willing to trade for a new puppy',
};
const review = {
  uReview: 'I think this website is pretty dang good!',
};

fixture('meteor-application-template-react localhost test with default db').page('http://localhost:3000');

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the user can sign up and create a new account', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, newCred.name, newCred.image, newCred.num, newCred.email, newCred.password);
});

test('Test that the user can sell a new item', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoSellPage(testController);
  await sellPage.isDisplayed(testController);
  await sellPage.sellItem(testController, item.name, item.image, item.description);
});

test('Test that the user can write a new review', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoReviewPage(testController);
  await reviewPage.isDisplayed(testController);
  await reviewPage.writeReview(testController, review.uReview);
});

test('Test that the user can sign in, and visit their profile', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, testCred.email, testCred.password);
  await navBar.isLoggedIn(testController, testCred.email);
  await navBar.gotoProfilePage(testController);
  await myProfilePage.isDisplayed(testController);
});

test('Test that user can sign in and view the community', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, testCred.email, testCred.password);
  await navBar.isLoggedIn(testController, testCred.email);
  await navBar.gotoComPage(testController);
  await comPage.isDisplayed(testController);
});

test.only('Test that user can sign in and view the shop', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, testCred.email, testCred.password);
  await navBar.isLoggedIn(testController, testCred.email);
  await navBar.gotoShopPage(testController);
  await shopPage.isDisplayed(testController);
});
