const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ProductPage');
const { CarrinhoPage } = require('../../pages/CarrinhoPage');

When('acesso a página do carrinho', async function () {
  await this.carrinhoPage.open();
});

Then('o produto adicionado deve estar visível no carrinho', async function () {
  expect(await this.carrinhoPage.getItemCount()).toBeGreaterThan(0);
});

Given('que tenho um produto adicionado ao carrinho', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.open();
  await this.productsPage.addFirstProductToCart();
  this.carrinhoPage = new CarrinhoPage(this.page);
  await this.carrinhoPage.open();
});

When('eu removo esse produto do carrinho', async function () {
  await this.carrinhoPage.removeFirstItem();
});

Then('o carrinho deve ficar sem o produto removido', async function () {
  expect(await this.carrinhoPage.getItemCount()).toBe(0);
});