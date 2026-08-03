class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.placeOrderButton = page.locator('a:has-text("Place Order")');

    // Página de pagamento (aparece depois de "Place Order")
    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payButton = page.locator('button[data-qa="pay-button"]');

    this.orderConfirmationMessage = page.locator('//*[@id="form"]/div/div/div/h2');
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async fillPaymentDetails(dados) {
    await this.nameOnCardInput.fill(dados.nomeCartao);
    await this.cardNumberInput.fill(dados.numeroCartao);
    await this.cvcInput.fill(dados.cvc);
    await this.expiryMonthInput.fill(dados.mesValidade);
    await this.expiryYearInput.fill(dados.anoValidade);
  }

  async confirmPayment() {
    await this.payButton.click();
  }

  async isOrderConfirmed() {
    return this.orderConfirmationMessage.isVisible();
  }
}

module.exports = { CheckoutPage };