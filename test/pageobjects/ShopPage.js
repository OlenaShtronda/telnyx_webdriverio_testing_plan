import { browser, $, expect } from '@wdio/globals';
import BasePage from './BasePage.js';

class ShopPage extends BasePage {
  get searchButton() { return $('summary[aria-label="Search"]') };
  get searchInput() { return $('#Search-In-Modal') };
  get firstProductTitle() { return $('.card__heading.h5 a') };

  get cartIcon() { return $('#cart-icon-bubble'); }
  get closeCartButton() { return $('button.drawer__close'); }
  get productSliderItems() { return $$('[aria-label="Slider"] li'); }
  get cartItemRows() { return $$('tr.cart-item'); }
  get removeItemButtons() { return $$('.cart-remove-button'); }
  get currencySelectorButton() { return $('button.localization-form__select'); }
  get currencyList() { return $('#FooterCountryList'); }
  get productPriceItems() { return $$('.product-grid li'); }

  emptyCartText = 'Your cart is empty';
  addToCartButtonText = 'Add to cart';

  async open() {
    await super.open('https://shop.telnyx.com/');
  }

  async clickCartIconToOpenCart() {
    await expect(this.cartIcon).toBeDisplayed();
    await this.cartIcon.click();
  }

  async assertCartIsEmpty() {
    const emptyText = await $(`//*[contains(text(), "${this.emptyCartText}")]`);
    await expect(emptyText).toBeDisplayed();
  }

  async clickCloseCartButtonToCloseCart() {
    await this.closeCartButton.click();
  }

  async addFirstProductToCart() {
    const firstProduct = this.productSliderItems[0];
    const addToCartButton = await firstProduct.$(`.//button[contains(normalize-space(), "${this.addToCartButtonText}")]`);
    await addToCartButton.click();
  }

  async assertCartHasAtLeastOneItem() {
    await expect(this.cartItemRows[0]).toBeDisplayed();
  }

  async removeFirstProduct() {
    await this.removeItemButtons[0].click();
  }

  async openCurrencySelector() {
    await this.currencySelectorButton.click();
  }

  async selectCurrency(currency) {
    const currencyOption = await $(`//span[contains(@class, "localization-form__currency") and contains(normalize-space(.), "${currency}")]`);
    await currencyOption.click();
  }

  async assertSelectedCurrency(currency) {
    await expect(this.currencySelectorButton).toHaveText(expect.stringContaining(currency));
  }

  async assertProductPricesInCorrectCurrency(currencySign) {
    const firstProductPrice = this.productPriceItems[0];
    await expect(firstProductPrice).toHaveText(expect.stringContaining(currencySign));
  }
  
  async clickSearchButtonToOpenSearchModal() {
    await this.searchButton.click();
  }

  async setSearchItem(text) {
    await this.searchInput.setValue(text);
  }

  async pressEnter() {
    await browser.keys('Enter');    
  }

  async assertSearchInputHasSearchItem(text) {
    await expect(this.searchInput).toHaveValue(text);
  }

  async assertFirstProductTitleContains(text) {
    const titleText = await this.firstProductTitle.getText();
    await expect(titleText.toLowerCase()).toContain(text.toLowerCase());
  }
}

export default new ShopPage();
