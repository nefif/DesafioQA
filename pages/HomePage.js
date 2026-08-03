const { BASE_URL } = require('../support/config');

class HomePage {
  constructor(page) {
    this.page = page;
    this.signupLoginLink = page.locator('a[href="/login"]');
  }

  async open() {
    await this.page.goto(BASE_URL);
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async selectCategory(category, subcategory) {
    // Menu de categorias é um acordeon: expande a categoria e clica na subcategoria
    await this.page.locator(`.panel-title a:has-text("${category}")`).click();
    await this.page.locator(`a:has-text("${subcategory}")`).first().click();
  }
}

module.exports = { HomePage };