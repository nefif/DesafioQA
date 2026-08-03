module.exports = {
  default: {
    paths: ['features/web/**/*.feature'],
    require: ['support', 'features/step_definitions'],
    format: [
      'summary',
      'progress-bar',
      'html:reports/cucumber-report.html'
    ],
    publishQuiet: true
  }
};