const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');
const { LoginPage } = require('../../pages/LoginPage');
const usuarios = require('../../fixtures/usuarios.json');

Given('que estou na página de login', async function () {
  this.homePage = new HomePage(this.page);
  this.loginPage = new LoginPage(this.page);
  await this.homePage.open();
  await this.homePage.goToSignupLogin();
});

When('eu informo um e-mail e senha de um usuário válido', async function () {
  const { email, senha } = usuarios.usuarioValido;
  await this.loginPage.fillCredentials(email, senha);
});

When('eu informo o e-mail {string} e a senha {string}', async function (email, senha) {
  await this.loginPage.fillCredentials(email, senha);
});

When('submeto o formulário de login', async function () {
  await this.loginPage.submit();
});

Then('eu devo estar autenticado na aplicação', async function () {
  expect(await this.loginPage.isLoggedIn()).toBeTruthy();
});

Then('devo visualizar o nome do usuário logado', async function () {
  expect(await this.loginPage.isLoggedIn()).toBeTruthy();
});

Then('um feedback de erro deve ser exibido', async function () {
  expect(await this.loginPage.isErrorVisible()).toBeTruthy();
});

Then('eu não devo estar autenticado na aplicação', async function () {
  expect(await this.loginPage.isLoggedIn()).toBeFalsy();
});