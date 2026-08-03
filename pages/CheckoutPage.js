class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.placeOrderButton = page.locator('a:has-text("Place Order")');
    this.orderConfirmationMessage = page.locator('h2:has-text("Congratulations")');
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async isOrderConfirmed() {
    return this.orderConfirmationMessage.isVisible();
  }
}

module.exports = { CheckoutPage };