import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { myProfilePage } from './myprofile.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'chinting@hawaii.edu', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup work', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, 'scott@foo.com', 'Scoot', 'changeme', '33333333', 'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/Scott_Robertson1.jpg');
  // await navBar.gotoSigninPage(testController);
  // await signinPage.signin(testController, 'scott@foo.com', 'changeme');
  // await navBar.isLoggedIn(testController, credentials.username);
});

test.only('Test that my-profile page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoMyProfile(testController);
  await myProfilePage.isDisplayed(testController);
});
