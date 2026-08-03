const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { CadastroPage } = require('../pages/CadastroPage');
const usuarios = require('../fixtures/usuarios.json');

Given('que estou na página inicial do Automation Exercise', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.open();
});

When('eu acesso a página de cadastro', async function () {
  await this.homePage.goToSignupLogin();
  this.cadastroPage = new CadastroPage(this.page);
});

When('preencho o formulário de cadastro com dados válidos', async function () {
  const dados = usuarios.novoUsuario;
  const emailUnico = `novo.usuario.qa+${Date.now()}@teste.com`;
  await this.cadastroPage.startSignup(dados.nome, emailUnico);
  await this.cadastroPage.fillAccountInformation(dados);
});

When('submeto o formulário', async function () {
  await this.cadastroPage.submitAccountCreation();
});

Then('o cadastro deve ser confirmado com sucesso', async function () {
  expect(await this.cadastroPage.isAccountCreated()).toBeTruthy();
});

Then('devo visualizar a mensagem de conta criada', async function () {
  await this.cadastroPage.continueAfterAccountCreation();
});

Given('que estou na página de cadastro', async function () {
  this.homePage = new HomePage(this.page);
  this.cadastroPage = new CadastroPage(this.page);
  await this.homePage.open();
  await this.homePage.goToSignupLogin();
});

When('eu submeto o formulário sem preencher o campo {string}', async function (campo) {
  await this.cadastroPage.submitEmptyRequiredField();
});

Then('a aplicação não deve concluir o cadastro', async function () {
  expect(await this.cadastroPage.isAccountCreated()).toBeFalsy();
});

Then('um indicativo de campo obrigatório deve ser exibido', async function () {
  expect(await this.cadastroPage.isRequiredFieldValidationTriggered()).toBeTruthy();
});