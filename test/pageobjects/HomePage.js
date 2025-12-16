import { $, expect } from '@wdio/globals';
import BasePage from './BasePage.js';

class Homepage extends BasePage {
  get voiceNetworkHeading() { return $('//h2[contains(text(), "THE VOICE NETWORK BUILT FOR")]'); }
  get textToSpeechTab() { return $('button[aria-label="Text to speech"]'); }
  get speechToTextTab() { return $('button[aria-label="Speech to text"]'); }
  get hdVoiceAITab() { return $('button[aria-label="HD Voice AI"]'); }
  get globalCoverageLink() { return $('footer [href="/global-coverage"]'); }
  get mainMenu() { return $('#main-menu-content'); }
  get pricingLink() { return $('[href="/pricing"]'); }
  get signUpLink() { return $('[data-content="Sign up"]'); }
  get contactUsLink() { return $$('a[href="https://telnyx.com/contact-us"]'); }
  get effortlessTextToSpeechHeading() { return $('//h2[contains(text(), "Effortless text-to-speech")]'); }
  get realTimeTranscriptionHeading() { return $('//h2[contains(text(), "Real-time transcription")]'); }
  get trueHDVoiceE2EHeading() { return $('//h2[contains(text(), "True HD voice, end-to-end")]'); }
  get textArea() { return $('#text-to-speech-textarea'); }
  get voiceDropdown() { return $('//label[text()="Voice"]/parent::div/button'); }
  get languageDropdown() { return $('//label[text()="Language"]/parent::div/button'); }
  get roleDropdown() { return $('//label[text()="Role"]/parent::div/button'); }
  get speedDropdown() { return $('//label[text()="Speed"]/parent::div/button'); }
  get playAudioButton() { return $('button[aria-label="Play audio"]'); }

  pricingText = 'Pricing';
  viewAllPricingText = 'View all pricing';

  async open() {
    await super.openHomePage();
  }

  async assertVoiceNetworkHeadingIsDisplayed() {
    await expect(this.voiceNetworkHeading).toBeDisplayed();
  }

  async clickTextToSpeech() {
    await this.textToSpeechTab.click();
  }

  async assertTextToSpeechTabIsDisplayedAndClickable() {
    await expect(this.textToSpeechTab).toBeDisplayed();
    await expect(this.textToSpeechTab).toBeClickable();
  }

  async assertEffortlessTextToSpeechTextIsDisplayed() {
    await expect(this.effortlessTextToSpeechHeading).toBeDisplayed();
  }

  async clickSpeechToText() {
    await this.speechToTextTab.click();
  }

  async assertRealTimeTranscriptionTextIsDisplayed() {
    await expect(this.realTimeTranscriptionHeading).toBeDisplayed();
  }

  async clickHDVoiceAI() {
    await this.hdVoiceAITab.click();
  }

  async assertTrueHDVoiceE2ETextIsDisplayed() {
    await expect(this.trueHDVoiceE2EHeading).toBeDisplayed();
  }

  // async clickGlobalCoverageLink() {
  //   await this.globalCoverageLink.click();
  // }

  // async clickPricingButton() {
  //   const pricingButton = this.mainMenu.$(`.//button[normalize-space()="${this.pricingText}"]`);
  //   await pricingButton.click();
  // }

  // async clickViewAllPricingButton() {
  //   const viewAllPricing = this.pricingLink.$(`.//span[normalize-space()="${this.viewAllPricingText}"]`);
  //   await viewAllPricing.click();
  // }

  async clickSignUpLink() {
    await this.signUpLink.click();
  }

  async clickContactUsLink() {
    await this.contactUsLink[1].click();
  }

  async selectFromDropdown(label, optionText) {
    const dropdown = await $(`//label[text()="${label}"]/parent::div/button`);
    await dropdown.click();

    const dropdownId = await dropdown.getAttribute('aria-controls');
    const container = await $(`#${dropdownId}`);

    const option = await container.$(`//*[text()="${optionText}"]`);
    await option.waitForClickable();
    await option.click();

    await expect(dropdown.$('span')).toHaveText(optionText);
  }

  async clearTextArea() {
    await this.textArea.clearValue();
  }

  async setTextAreaValue(text) {
    await this.textArea.setValue(text);
  }

  async assertTextAreaIsDisplayed() {
    await expect(this.textArea).toBeDisplayed();
  }

  async assertTextAreaValue(expected) {
    await expect(this.textArea).toHaveValue(expected);
  }

  async assertVoiceDropdownHasCorrectValue(voice) {
    await expect(this.voiceDropdown).toHaveText(voice);
  }

  async assertLanguageDropdownHasCorrectValue(language) {
    await expect(this.languageDropdown).toHaveText(language);
  }

  async assertRoleDropdownHasCorrectValue(role) {
    await expect(this.roleDropdown).toHaveText(role);
  }

  async assertSpeedDropdownHasCorrectValue(speed) {
    await expect(this.speedDropdown).toHaveText(speed);
  }

  async assertPlayAudioButtonIsDisplayedAndEnabled() {
    await expect(this.playAudioButton).toBeDisplayed();
    await expect(this.playAudioButton).toBeEnabled();
  }

  async assertTextAreaHasCorrectPlaceholder(placeholder) {
    await expect(this.textArea).toHaveAttribute('placeholder', placeholder);
  }

  async getSpeedDropdownText() {
    return await this.speedDropdown.$('span').getText();
  }
}

export default new Homepage();
