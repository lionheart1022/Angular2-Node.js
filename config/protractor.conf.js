const Reporter = require('jasmine-spec-reporter').SpecReporter;
const path = require('path');

exports.config = {
  baseUrl: 'http://localhost:8000',
  specs: [
    path.resolve(__dirname, '../e2e/**/*.e2e.ts')
  ],
  exclude: [],
  framework: 'jasmine2',
  allScriptsTimeout: 100000,
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 300000
  },
  directConnect: true,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['show-fps-counter=true', 'no-sandbox']
    }
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: () => {
    require('ts-node').register({
      project: path.resolve(__dirname, '../e2e')
    });
  },
  onPrepare: () => {
    jasmine.getEnv().addReporter(new Reporter());
  }
};
