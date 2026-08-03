const BASE_URL = 'https://automationexercise.com/products';

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productItems = page.locator('.product-image-wrapper');
    this.addToCartButtons = page.locator('a:has-text("Add to cart")');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.productNames = page.locator('.productinfo p');
  }

  async open() {
    await this.page.goto(BASE_URL);
  }

  async searchProduct(termo) {
    await this.searchInput.fill(termo);
    await this.searchButton.click();
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async addFirstProductToCart() {
    await this.productItems.first().hover();
    await this.addToCartButtons.first().click();
    if (await this.continueShoppingButton.isVisible()) {
      await this.continueShoppingButton.click();
    }
  }
}

module.exports = { ProductsPage };