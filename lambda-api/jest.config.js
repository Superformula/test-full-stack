module.exports = {
  name: 'lambda-api',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/testSetup.js'],
  setupFiles: ['<rootDir>/test/setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.dynamodb/',
    '<rootDir>/.serverless/',
    '<rootDir>/.webpack/',
  ],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
      tsConfig: 'tsconfig.spec.json',
    },
  },
  preset: 'ts-jest',
};
