import signUpPage from '../pageobjects/SignupPage.js';
import homepage from '../pageobjects/HomePage.js';

describe('Sign-up form content tests', () => {
  beforeEach(async () => {
    await homepage.open();
    await homepage.clickSignUpLink();
  });

  it('should display all required form fields and checkboxes', async () => {
    await signUpPage.assertRequiredFieldsAndCheckboxesAreDisplayed();
  });

  it('should reveal promo code field with correct labels after clicking "Apply a promo code"', async () => {
    await signUpPage.assertPromoCodeFieldIsInitiallyHidden();
    await signUpPage.clickApplyAPromoCodeButton();
    await signUpPage.assertPromoCodeFieldIsDisplayed();
    await signUpPage.assertPromoCodeHasCorrectLabels();
  });
});
