import shopPage from '../pageobjects/ShopPage.js';
import shopTestData from '../fixtures/shopTestData.json';

describe('Shop page tests', () => {
  beforeEach('Open Shop page', async () => {
    await shopPage.open();
  });

  it('Verify searching for products and displaying output for available products', async () => {
    for (const item of shopTestData.searchItems) {
      console.log(`Testing search item: ${item}`);

      await shopPage.clickSearchButtonToOpenSearchModal();
      await shopPage.setSearchItem(item);
      await shopPage.assertSearchInputHasSearchItem(item);
      await shopPage.clickSearchIcon();
      await shopPage.assertFirstProductTitleContains(item);
    }
  });

  it('Verify at least one item is added to the cart', async () => {
    await shopPage.clickCartIconToOpenCart();
    await shopPage.assertCartIsEmpty();
    await shopPage.clickCloseCartButtonToCloseCart();

    await shopPage.addFirstProductToCart();
    await shopPage.assertCartHasAtLeastOneItem();
  });

  it('Verify the cart is empty after removing the last product', async () => {
      await shopPage.addFirstProductToCart();
      await shopPage.removeFirstProduct();
      await shopPage.assertCartIsEmpty();
    });

  it('Verify changing currencies and validating displayed prices', async () => {
    for (const currency of shopTestData.currencies) {
      console.log(`Testing currency: code=${currency.code}, symbol=${currency.symbol}`);

      await shopPage.openCurrencySelector();
      await shopPage.selectCurrency(currency.code);
      await shopPage.assertSelectedCurrency(currency.code);
      await shopPage.assertProductPricesInCorrectCurrency(currency.symbol);
    }
  });
});
