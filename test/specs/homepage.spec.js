import homepage from '../pageobjects/HomePage.js';
import contactUsPage from '../pageobjects/ContactUsPage.js';

describe('Homepage tests', () => {
  beforeEach(async () => {
    await homepage.open();
  });

  it('should display hero title', async () => {
    await homepage.assertHeroTitleIsDisplayed();
  });

  it('switches to Text to speech', async () => {
    await homepage.clickTextToSpeech();
    await homepage.assertEffortlessTextToSpeechTextIsDisplayed();
  });

  it('switches to Speech to text', async () => {
    await homepage.clickSpeechToText();
    await homepage.assertRealTimeTranscriptionTextIsDisplayed();
  });

  it('switches to HD Voice AI', async () => {
    await homepage.clickTextToSpeech();
    await homepage.clickHDVoiceAI();
    await homepage.assertTrueHDVoiceE2ETextIsDisplayed();
  });

  it('navigates to Contact Us page', async () => {
    await homepage.clickContactUsLink();
    await contactUsPage.assertContactUsPageIsOpened();
  });
});
