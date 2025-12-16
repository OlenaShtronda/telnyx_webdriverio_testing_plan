import { config as baseConfig } from './wdio.base.conf.js';

export const config = {
    ...baseConfig,

    capabilities: [
        { browserName: 'chrome' },
        { browserName: 'firefox' },
        { browserName: 'MicrosoftEdge' }
    ]
};
