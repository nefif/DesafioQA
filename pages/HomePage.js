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
    await this.page.locator(`//*[@id="accordian"]/div[1]/div[1]/h4/a`).click();
    await this.page.locator(`a:has-text("${subcategory}")`).first().click();
  }
}

module.exports = { HomePage };