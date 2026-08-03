const { BASE_URL } = require('../support/config');

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
    await this.page.goto(`${BASE_URL}/products`);
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
    // Espera de verdade o modal de confirmação aparecer (garante que o AJAX
    // de adicionar ao carrinho já terminou antes de prosseguir)
    await this.continueShoppingButton.waitFor({ state: 'visible' });
    await this.continueShoppingButton.click();
  }
}

module.exports = { ProductsPage };