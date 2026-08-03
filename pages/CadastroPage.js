class CadastroPage {
  constructor(page) {
    this.page = page;

    // Formulário inicial (nome/e-mail) - "New User Signup!"
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');

    // Formulário detalhado - "Enter Account Information"
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.daySelect = page.locator('select[data-qa="days"]');
    this.monthSelect = page.locator('select[data-qa="months"]');
    this.yearSelect = page.locator('select[data-qa="years"]');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.addressInput = page.locator('input[data-qa="address"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');

    // Confirmação
    this.accountCreatedMessage = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async startSignup(name, email) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }

  async fillAccountInformation(dados) {
    await this.passwordInput.fill(dados.senha);
    await this.daySelect.selectOption(dados.dia);
    await this.monthSelect.selectOption(dados.mes);
    await this.yearSelect.selectOption(dados.ano);
    await this.firstNameInput.fill(dados.primeiroNome);
    await this.lastNameInput.fill(dados.ultimoNome);
    await this.addressInput.fill(dados.endereco);
    await this.countrySelect.selectOption(dados.pais);
    await this.stateInput.fill(dados.estado);
    await this.cityInput.fill(dados.cidade);
    await this.zipcodeInput.fill(dados.cep);
    await this.mobileNumberInput.fill(dados.telefone);
  }

  async submitAccountCreation() {
    await this.createAccountButton.click();
  }

  async isAccountCreated() {
    return this.accountCreatedMessage.isVisible();
  }

  async continueAfterAccountCreation() {
    await this.continueButton.click();
  }

  async submitEmptyRequiredField() {
    // Preenche apenas o e-mail e tenta submeter sem o nome (campo obrigatório)
    await this.emailInput.fill(`campo.obrigatorio+${Date.now()}@teste.com`);
    await this.signupButton.click();
  }

  async isRequiredFieldValidationTriggered() {
    // O input HTML5 "required" impede o submit; a página de cadastro não avança
    return this.nameInput.isVisible();
  }
}

module.exports = { CadastroPage };