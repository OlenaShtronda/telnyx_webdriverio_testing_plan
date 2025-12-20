import homepage from '../pageobjects/HomePage.js';
import contactUsPage from '../pageobjects/ContactUsPage.js';

describe('Homepage tests', () => {
  beforeEach(async () => {
    await homepage.open();
  });

  it('Verify the "The Voice Network" heading is displayed', async () => {
    await homepage.assertVoiceNetworkHeadingIsDisplayed();
  });

  it('Verify switching to the "Text to Speech" tab', async () => {
    await homepage.clickTextToSpeech();
    await homepage.assertEffortlessTextToSpeechTextIsDisplayed();
  });

  it('Verify switching to the "Speech to Text" tab', async () => {
    await homepage.clickSpeechToText();
    await homepage.assertRealTimeTranscriptionTextIsDisplayed();
  });

  it('Verify switching to the "HD Voice AI" tab', async () => {
    await homepage.clickTextToSpeech();
    await homepage.clickHDVoiceAI();
    await homepage.assertTrueHDVoiceE2ETextIsDisplayed();
  });

  it('Verify navigation to the "Contact Us" page', async () => {
    await homepage.clickContactUsLink();
    await contactUsPage.assertContactUsPageIsOpened();
  });
});
