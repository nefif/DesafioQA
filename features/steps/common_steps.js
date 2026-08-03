const { Given, When } = require('@cucumber/cucumber');
const { ProductsPage } = require('../pages/ProductsPage');
const { CarrinhoPage } = require('../pages/CarrinhoPage');

// Reutilizado por busca_produto.feature e carrinho.feature
Given('que estou na página de produtos', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.open();
});

// Reutilizado por carrinho.feature e checkout.feature
When('eu adiciono um produto ao carrinho', async function () {
  if (!this.productsPage) {
    this.productsPage = new ProductsPage(this.page);
    await this.productsPage.open();
  }
  await this.productsPage.addFirstProductToCart();
  this.carrinhoPage = new CarrinhoPage(this.page);
});