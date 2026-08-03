class CarrinhoPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('a[href="/view_cart"]');
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
    await this.removeButtons.first().click();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}

module.exports = { CarrinhoPage };