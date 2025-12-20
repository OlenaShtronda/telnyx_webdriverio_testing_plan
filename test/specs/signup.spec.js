import signUpPage from '../pageobjects/SignupPage.js';
import homepage from '../pageobjects/HomePage.js';

describe('Sign-up form content tests', () => {
  beforeEach(async () => {
    await homepage.open();
    await homepage.clickSignUpLink();
  });

  it('Verify all required form fields and checkboxes are displayed', async () => {
    await signUpPage.assertRequiredFieldsAndCheckboxesAreDisplayed();
  });

  it('Verify the promo code field is revealed with correct labels after clicking "Apply a promo code"', async () => {
    await signUpPage.assertPromoCodeFieldIsInitiallyHidden();
    await signUpPage.clickApplyAPromoCodeButton();
    await signUpPage.assertPromoCodeFieldIsDisplayed();
    await signUpPage.assertPromoCodeHasCorrectLabels();
  });
});
