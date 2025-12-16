import { config as baseConfig } from './wdio.base.conf.js';

export const config = {
    ...baseConfig,

    capabilities: [{
        browserName: 'MicrosoftEdge',
        'ms:edgeOptions': {
            args: ['--window-size=1920,1080']
        }
    }]
};
