import { expect } from '@wdio/globals';

class SignUpPage {  
  get email() { return $('#email'); }
  get firstName() { return $('#first_name'); }
  get lastName() { return $('#last_name'); }
  get password() { return $('#password'); }
  get termsCheckbox() { return $('#terms_and_conditions'); }
  get subscriptionCheckbox() { return $('#subscription_opt_in'); }
  get promoCodeButton() { return $('button=Apply a promo code'); }
  get promoCodeField() { return $('#promo_code'); }
  get promoCodeLabel() { return $('label[for="promo_code"]'); }

  async assertRequiredFieldsAndCheckboxesAreDisplayed() {
    const elements = [
        this.email,
        this.firstName,
        this.lastName,
        this.password,
        this.termsCheckbox,
        this.subscriptionCheckbox
    ];

    for (const element of elements) {
        await expect(element).toBeDisplayed();
    }
  }

  async assertPromoCodeFieldIsInitiallyHidden() {
      await expect(this.promoCodeField).not.toExist();
  }

  async clickApplyAPromoCodeButton() {
      await this.promoCodeButton.click();
  }

  async assertPromoCodeFieldIsDisplayed() {
      await expect(this.promoCodeField).toBeDisplayed();
  }

  async assertPromoCodeHasCorrectLabels() {
    const text = await this.promoCodeLabel.getText();

    await expect(text).toContain('Promo code');
    await expect(text).toContain('Optional');
  }
}

export default new SignUpPage();
