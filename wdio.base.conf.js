export const config = {
    runner: 'local',

    specs: ['./test/specs/**/*.js'],
    exclude: [],

    maxInstances: 10,

    logLevel: 'info',
    bail: 0,

    baseUrl: 'https://telnyx.com',

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    before: async () => {
      await browser.setWindowSize(1920, 1080);
    },
}
