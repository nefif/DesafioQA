class CarrinhoPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('a[href="/view_cart"]').first();
    this.cartItems = page.locator('#cart_info tbody tr');
    this.removeButtons = page.locator('.cart_quantity_delete');
    this.proceedToCheckoutButton = page.locator('a:has-text("Proceed To Checkout")');
  }

  async open() {
    await this.cartLink.click();
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async removeFirstItem() {
    const firstRow = this.cartItems.first();
    await this.removeButtons.first().click();
    // Aguarda a linha ser removida de fato do DOM (remoção é via AJAX,
    // sem reload de página) antes de seguir para a asserção
    await firstRow.waitFor({ state: 'detached' });
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}

module.exports = { CarrinhoPage };