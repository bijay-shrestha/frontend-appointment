const {defaults} = require('jest-config');

module.exports = {
    verbose: true,
    cacheDirectory: '.jest-cache',
    coverageDirectory: '.jest-coverage',
    coveragePathIgnorePatterns: [
        '<rootDir>/packages/apps/(?:.+?)/build/'
    ],
    transformIgnorePatterns:[
        '<rootDir>/node_modules/',
        '/scripts/',
        '<rootDir>/packages/apps/(?:.+?)/build/'
    ],
    testMatch: ['src/.*\\.test\\.js$','src/.*\\/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    coverageReporters: ['html', 'text'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    testPathIgnorePatterns: ['/node_modules/',
        '<rootDir>/packages/apps/(?:.+?)/build/',
        '/scripts/',
        '\\\\\\\\node_modules\\\\\\\\',
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
        "\\.(scss|sass|css)$": "identity-obj-proxy"
    },
    moduleFileExtensions:[...defaults.moduleFileExtensions, 'node'
    ],
    setupFiles:[
        './jest.setup.js'
    ]
};