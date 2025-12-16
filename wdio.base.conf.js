import { environments } from './config/environments.js';

const ENV = process.env.ENV || 'prodEn';
const SPEC = process.env.SPEC;

if (!environments[ENV]) {
  throw new Error(
      `Unknown ENV "${ENV}". Available envs: ${Object.keys(environments).join(', ')}`
  );
}

const selectedEnv = environments[ENV];

export const config = {
  runner: 'local',

  specs: SPEC ? [SPEC] : ['./test/specs/**/*.js'],
  exclude: [],

  baseUrl: selectedEnv.baseUrl,

  params: {
    language: selectedEnv.language,
    testDataFile: selectedEnv.testDataFile
  },

  maxInstances: 10,

  logLevel: 'info',
  bail: 0,

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  before: async () => {
    await browser.setWindowSize(1920, 1080);
  }
};