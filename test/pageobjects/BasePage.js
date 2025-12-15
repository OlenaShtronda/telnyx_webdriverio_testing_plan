import { browser } from '@wdio/globals';

export default class BasePage {
  async open(path = '') {
    await browser.url(path);
  }

  async openHomePage() {
    await browser.url('/');
  }
}
