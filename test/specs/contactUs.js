import contactUsPage from '../pageobjects/ContactUsPage.js';
import homePage from '../pageobjects/HomePage.js';

describe('Contact Us form tests', () => {
    beforeEach('Navigate to Contact Us page', async () => {
      await homePage.open();
      await homePage.clickContactUsLink();
    });

    it('displays required fields with labels and enabled Submit button', async () => {
      await contactUsPage.assertRequiredFieldsAreDisplayed();
      await contactUsPage.assertSubmitButtonIsDisplayedAndEnabled();
    });
});