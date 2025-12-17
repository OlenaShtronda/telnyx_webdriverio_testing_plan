import { config as baseConfig } from './wdio.base.conf.js';

export const config = {
  ...baseConfig,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--window-size=1920,1080',
        '--disable-infobars',
        '--no-sandbox',
        '--disable-dev-shm-usage'
      ]
    }
  }],

  afterCommand: async function (commandName) {
    if (this.capabilities.browserName === 'chrome') {
      const commandsToWaitAfter = ['click', 'setValue', 'clearValue', 'getText'];
      if (commandsToWaitAfter.includes(commandName)) {
        await browser.pause(500);
      }
    }
  }
};