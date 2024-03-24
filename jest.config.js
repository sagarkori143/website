module.exports = {
  coverageReporters: ['json', 'text', 'lcov'],
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './html-report',
      filename: 'coverage.html',
      expand: true
    }]
  ]
};
