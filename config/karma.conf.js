module.exports = function (c) {
  let testWebpackConfig = require('./webpack.test.js')({ env: 'test' });

  let i = require('istanbul');
  i.Report.register(require('istanbul-reporter-shield-badge'));

  let conf = {
    basePath: '..',
    frameworks: ['jasmine'],
    client: {
      captureConsole: false
    },
    files: [
      { pattern: './config/spec-bundle.js', watched: false },
      { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false },
      'src/styles/app.sass',
    ],
    exclude: [],
    preprocessors: { './config/spec-bundle.js': ['webpack'], 'src/styles/app.sass': ['sass'] },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-spec-reporter'),
      require('karma-coverage'),
      require('./karma-sass-processor'),
    ],
    webpack: testWebpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    reporters: ['spec', 'coverage'],
    specReporter: {
      maxLogLines: 3,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true
    },
    coverageReporter: {
      dir: '../coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
        { type: 'shield-badge',
          subdir: '.',
          coverageType: 'lines',
          range: [75, 90],
          subject: 'coverage', 
          readmeFilename: 'README.md',
          readmeDir: '../..'
        }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: c.LOG_INFO,
    autoWatch: false,
    browsers: [
      'Chrome'
    ],
    customLaunchers: {
      ChromeDesktop: {
        base: 'Chrome',
        flags: ['--window-size=1200,800', '--no-sandbox']
      }
    },
    mime: { 'text/x-typescript': ['ts', 'tsx'] },
    singleRun: true,
    concurrency: Infinity,
  }
  c.set(conf);
  i.Report.create('shield-badge');
}
