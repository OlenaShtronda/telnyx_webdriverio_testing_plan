import { config as baseConfig } from './wdio.base.conf.js';

export const config = {
    ...baseConfig,

    capabilities: [{
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: ['-width=1920', '-height=1080']
        }
    }]
};
