const { Before, After, Status } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

Before(async function () {
  await this.openBrowser();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshotsDir = path.join(__dirname, '..', 'reports', 'screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    const safeName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const screenshotPath = path.join(screenshotsDir, `${safeName}_${Date.now()}.png`);

    const image = await this.page.screenshot({ path: screenshotPath, fullPage: true });
    this.attach(image, 'image/png');
  }

  await this.closeBrowser();
});