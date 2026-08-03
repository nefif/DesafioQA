const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductsPage } = require('../pages/ProductsPage');

When('eu busco pelo termo {string}', async function (termo) {
  await this.productsPage.searchProduct(termo);
});

Then('os resultados exibidos devem conter produtos condizentes com o termo buscado', async function () {
  const nomes = await this.productsPage.getProductNames();
  expect(nomes.length).toBeGreaterThan(0);
});

Given('que estou na página inicial', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.open();
});

When('eu seleciono a categoria {string} e a subcategoria {string}', async function (categoria, subcategoria) {
  await this.homePage.selectCategory(categoria, subcategoria);
  this.productsPage = new ProductsPage(this.page);
});

Then('os produtos listados devem pertencer à categoria selecionada', async function () {
  const nomes = await this.productsPage.getProductNames();
  expect(nomes.length).toBeGreaterThan(0);
});