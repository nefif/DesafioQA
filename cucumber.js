module.exports = {
  default: {
    paths: ['features/web/**/*.feature'],
    require: ['support/**/*.js', 'step_definitions/**/*.js'],
    format: [
      'summary',
      'progress-bar',
      'html:reports/cucumber-report.html'
    ],
    publishQuiet: true
  }
};