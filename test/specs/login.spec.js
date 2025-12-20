import { faker } from '@faker-js/faker';
import loginPage from '../pageobjects/LoginPage.js';

describe('Login page tests', () => {
    beforeEach('Navigate to Login page', async () => {
      await loginPage.open();
    });

  it('Verify business email field does not accept invalid password', async () => {
    const randomEmail = faker.internet.email();
    const invalidEmail = randomEmail.replace('@', '');

    await loginPage.setBusinessEmail(invalidEmail);
    await loginPage.clickPasswordField();
    await loginPage.assertEmailErrorContains('Please enter a valid email address.')
    await loginPage.assertLoginPageUrl();
  });

  it('Verify required email, password fields with labels and enabled "Login" button', async () => {
    await loginPage.assertFieldsAreDisplayedAndRequired();
    await loginPage.assertFieldLabelsAreDisplayed();
    await loginPage.assertLoginButtonIsDisplayedAndEnabled();
  });
});
