import { environments } from './config/environments.js';
import path from 'path';

const ENV = process.env.ENV || 'prodEn';
const SPEC = process.env.SPEC;
const SELENIUM_REMOTE_URL = process.env.SELENIUM_REMOTE_URL;

if (!environments[ENV]) {
  throw new Error(
      `Unknown ENV "${ENV}". Available envs: ${Object.keys(environments).join(', ')}`
  );
}

const selectedEnv = environments[ENV];
const seleniumUrl = SELENIUM_REMOTE_URL
  ? new URL(SELENIUM_REMOTE_URL)
  : undefined;

export const config = {
  runner: 'local',

  hostname: seleniumUrl?.hostname,
  port: seleniumUrl?.port ? Number(seleniumUrl.port) : undefined,
  path: seleniumUrl?.pathname || undefined,

  specs: SPEC ? [SPEC] : ['./test/specs/**/*.js'],
  exclude: [],

  baseUrl: selectedEnv.baseUrl,

  params: {
    language: selectedEnv.language,
    testDataFile: path.resolve(process.cwd(), selectedEnv.testDataFile)
  },

  maxInstances: 2,

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