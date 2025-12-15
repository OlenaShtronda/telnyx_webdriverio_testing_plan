import { browser, $, expect } from '@wdio/globals';

class ContactUsPage {
  get talkToAnExpertTitle() { return $('//h1[contains(text(), "Talk to an expert")]'); }
  get howCanWeHelpDropdown() { return $('#Reason_for_Contact__c'); }
  get countryDropdown() { return $('#Phone_Number_Extension__c'); }
  get firstNameField() { return $('#FirstName'); }
  get lastNameField() { return $('#LastName'); }
  get businessEmailField() { return $('#Email'); }
  get phoneNumberField() { return $('#Phone_Number_Base__c'); }
  get companyWebsiteField() { return $('#Website'); }
  get howDidYouHearAboutTelnyxField() { return $('#How_did_you_hear_about_Telnyx_Open__c'); }
  get submitButton() { return $('button[type="submit"]'); } 

  async assertContactUsPageIsOpened() {
    await expect(browser).toHaveUrl('https://telnyx.com/contact-us');
    await expect(this.talkToAnExpertTitle).toBeDisplayed();
  }

  async assertRequiredFieldsAreDisplayed() {
    const elements = [
        this.howCanWeHelpDropdown,
        this.countryDropdown,
        this.firstNameField,
        this.lastNameField,
        this.businessEmailField,
        this.phoneNumberField,
        this.companyWebsiteField,
        this.howDidYouHearAboutTelnyxField,
      ]

    for (const locator of elements) {
        await expect(locator).toBeDisplayed();
        await expect(locator).toHaveAttribute('aria-required', 'true');
      }
  }

  async assertSubmitButtonIsDisplayedAndEnabled() {
    await expect(this.submitButton).toBeDisplayed();
    await expect(this.submitButton).toBeEnabled();    
  }
}

export default new ContactUsPage();
