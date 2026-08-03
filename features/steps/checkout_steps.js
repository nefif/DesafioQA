const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const usuarios = require('../fixtures/usuarios.json');

Given('que estou autenticado na aplicação', async function () {
  this.homePage = new HomePage(this.page);
  this.loginPage = new LoginPage(this.page);
  await this.homePage.open();
  await this.homePage.goToSignupLogin();
  const { email, senha } = usuarios.usuarioValido;
  await this.loginPage.fillCredentials(email, senha);
  await this.loginPage.submit();
});

When('eu prossigo para o checkout', async function () {
  await this.carrinhoPage.proceedToCheckout();
  this.checkoutPage = new CheckoutPage(this.page);
});

When('eu confirmo o pedido', async function () {
  await this.checkoutPage.placeOrder();
});

Then('o pedido deve ser confirmado com sucesso', async function () {
  expect(await this.checkoutPage.isOrderConfirmed()).toBeTruthy();
});