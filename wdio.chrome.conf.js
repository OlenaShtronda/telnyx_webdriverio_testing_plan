import { config as baseConfig } from './wdio.base.conf.js';

export const config = {
    ...baseConfig,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-infobars',
                '--disable-gpu',
                '--window-size=1920,1080'
            ]
        }
    }]
};
