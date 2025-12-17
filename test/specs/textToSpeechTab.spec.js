import { browser } from '@wdio/globals';
import homepage from '../pageobjects/HomePage.js';
import fs from 'fs';
import path from 'path';

let homeTestData;

describe('[ENV] Text to speech tab', () => {

  before(async () => {
    const relativePath = browser.options.params.testDataFile;

    if (!relativePath) {
      throw new Error('testDataFile is not defined in WDIO params');
    }

    const absolutePath = path.resolve(process.cwd(), relativePath);

    homeTestData = JSON.parse(
      fs.readFileSync(absolutePath, 'utf-8')
    );
  });

  beforeEach('Open Text-to-Speech tab', async () => {
    await homepage.open();
    await homepage.assertTextToSpeechTabIsDisplayedAndClickable();
    await homepage.clickTextToSpeech();
  });

  it('shows correct default state on Text to Speech tab', async () => {
    const { defaultState } = homeTestData.textToSpeech;

    await homepage.assertTextAreaIsDisplayed();
    await homepage.assertTextAreaValue(defaultState.text);
    await homepage.assertVoiceDropdownHasCorrectValue(defaultState.voice);
    await homepage.assertLanguageDropdownHasCorrectValue(defaultState.language);
    await homepage.assertRoleDropdownHasCorrectValue(defaultState.role);
    await homepage.assertSpeedDropdownHasCorrectValue(defaultState.speed);
    await homepage.assertPlayAudioButtonIsDisplayedAndEnabled();
  });

  it('keeps text input value after dropdown changes', async () => {
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

  it('allows clearing sample text and entering new text', async () => {
    const { defaultState, newTextSamples } = homeTestData.textToSpeech;

    await homepage.clearTextArea();
    await homepage.assertTextAreaValue('');
    await homepage.assertTextAreaHasCorrectPlaceholder(defaultState.placeholder);

    await homepage.setTextAreaValue(newTextSamples.orca);
    await homepage.assertTextAreaValue(newTextSamples.orca);
  });

  it('allows selecting values from all dropdowns', async () => {
    await homepage.selectFromDropdown('Voice', 'Astra');
    await homepage.selectFromDropdown('Language', 'Es-ES');
    await homepage.selectFromDropdown('Role', 'Customer service');
    await homepage.selectFromDropdown('Speed', '2x');
  });

  it('allows selecting all Speed options without resetting text', async () => {
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

  it('resets to default state after page reload', async () => {
    const { defaultState } = homeTestData.textToSpeech;

    await homepage.assertSpeedDropdownHasCorrectValue(defaultState.speed);
    await homepage.selectFromDropdown('Speed', '2x');

    await browser.refresh();
    await homepage.clickTextToSpeech();

    await homepage.assertSpeedDropdownHasCorrectValue(defaultState.speed);
  });
});
