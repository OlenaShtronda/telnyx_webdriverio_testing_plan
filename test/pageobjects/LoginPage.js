import { browser, $, expect } from '@wdio/globals';
import BasePage from './BasePage.js';

class LoginPage extends BasePage {
  get businessEmailField() { return $('input[name="email"]'); }
  get passwordField() { return $('input[name="password"]'); }
  get loginButton() { return $('button[type="submit"]'); }
  get businessEmailLabel() { return $('//label[contains(text(), "Business Email")]'); }
  get passwordLabel() { return $('//label[contains(text(), "Password")]'); }
  get emailError() { return $('p.Mui-error'); }

  async open() {
    await super.open('https://portal.telnyx.com/#/login/sign-in');
  }

  async setBusinessEmail(email) {
    await this.businessEmailField.setValue(email);
  }

  async clickPasswordField() {
    await this.passwordField.click();
  }

  async assertEmailErrorContains(expectedText) {
    await expect(this.emailError).toBeDisplayed();
    const text = await this.emailError.getText();
    await expect(text).toContain(expectedText);
  }

  async assertLoginPageUrl() {
    await expect(browser).toHaveUrl('https://portal.telnyx.com/#/login/sign-in');
  }

  async assertFieldsAreDisplayedAndRequired() {
    await expect(this.businessEmailField).toBeDisplayed();
    await expect(this.businessEmailField).toHaveAttribute('required');
    await expect(this.passwordField).toBeDisplayed();
    await expect(this.passwordField).toHaveAttribute('required');   
  }

  async assertFieldLabelsAreDisplayed() {
    await expect(this.businessEmailLabel).toBeDisplayed();
    await expect(this.passwordLabel).toBeDisplayed();
  }

  async assertLoginButtonIsDisplayedAndEnabled() {
    await expect(this.loginButton).toBeDisplayed();
    await expect(this.loginButton).toBeEnabled();
  }
}

export default new LoginPage();
