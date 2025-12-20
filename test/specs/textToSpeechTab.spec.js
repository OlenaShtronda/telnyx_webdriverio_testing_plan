import { browser } from '@wdio/globals';
import homepage from '../pageobjects/HomePage.js';
import TestDataHelper from '../helpers/testDataHelper.js';

let homeTestData;

describe('[ENV] Text to speech tab', () => {

  before(async () => {
    homeTestData = TestDataHelper.loadTestData();
  });

  beforeEach('Open Text-to-Speech tab', async () => {
    await homepage.open();
    await homepage.assertTextToSpeechTabIsDisplayedAndClickable();
    await homepage.clickTextToSpeech();
  });

  it('Verify the correct default state is displayed on the "Text to Speech" tab', async () => {
    const { defaultState } = homeTestData.textToSpeech;

    await homepage.assertTextAreaIsDisplayed();
    await homepage.assertTextAreaValue(defaultState.text);
    await homepage.assertVoiceDropdownHasCorrectValue(defaultState.voice);
    await homepage.assertLanguageDropdownHasCorrectValue(defaultState.language);
    await homepage.assertRoleDropdownHasCorrectValue(defaultState.role);
    await homepage.assertSpeedDropdownHasCorrectValue(defaultState.speed);
    await homepage.assertPlayAudioButtonIsDisplayedAndEnabled();
  });

  it('Verify the text input value is preserved after changing dropdown values', async () => {
    const { newTextSamples, dropdownSelections } = homeTestData.textToSpeech;

    await homepage.clearTextArea();
    await homepage.setTextAreaValue(newTextSamples.orca);
    await homepage.assertTextAreaValue(newTextSamples.orca);

    await homepage.selectFromDropdown('Language', dropdownSelections.language[0]);
    await homepage.assertTextAreaValue(newTextSamples.orca);

    await homepage.selectFromDropdown('Voice', dropdownSelections.voice[0]);
    await homepage.assertTextAreaValue(newTextSamples.orca);

    await homepage.selectFromDropdown('Speed', dropdownSelections.speed[3]);
    await homepage.assertTextAreaValue(newTextSamples.orca);
  });

  it('Verify clearing the sample text and entering new text is allowed', async () => {
    const { defaultState, newTextSamples } = homeTestData.textToSpeech;

    await homepage.clearTextArea();
    await homepage.assertTextAreaValue('');
    await homepage.assertTextAreaHasCorrectPlaceholder(defaultState.placeholder);

    await homepage.setTextAreaValue(newTextSamples.orca);
    await homepage.assertTextAreaValue(newTextSamples.orca);
  });

  it('Verify selecting values from all dropdowns is allowed', async () => {
    await homepage.selectFromDropdown('Voice', 'Astra');
    await homepage.selectFromDropdown('Language', 'Es-ES');
    await homepage.selectFromDropdown('Role', 'Customer service');
    await homepage.selectFromDropdown('Speed', '2x');
  });

  it('Verify selecting all Speed options does not reset the text', async () => {
    const { newTextSamples, dropdownSelections, defaultState } = homeTestData.textToSpeech;

    await homepage.clearTextArea();
    await homepage.setTextAreaValue(newTextSamples.detective);
    await homepage.assertTextAreaValue(newTextSamples.detective);
    await homepage.assertSpeedDropdownHasCorrectValue(defaultState.speed);

    for (const speed of dropdownSelections.speed) {
      const currentValue = await homepage.getSpeedDropdownText();
      if (currentValue === speed) continue;

      await homepage.selectFromDropdown('Speed', speed);
      await homepage.assertTextAreaValue(newTextSamples.detective);
    }
  });

  it('Verify the default state is restored after page reload', async () => {
    const { defaultState } = homeTestData.textToSpeech;

    await homepage.assertSpeedDropdownHasCorrectValue(defaultState.speed);
    await homepage.selectFromDropdown('Speed', '2x');

    await browser.refresh();
    await homepage.clickTextToSpeech();

    await homepage.assertSpeedDropdownHasCorrectValue(defaultState.speed);
  });
});
