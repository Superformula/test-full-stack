module.exports = {
  setupFilesAfterEnv: [],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  setupFiles: [],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/setup/',
    '<rootDir>[/\\\\](build|docs|node_modules|scripts)[/\\\\]'
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  resolver: 'jest-pnp-resolver',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test|tests).{ts,tsx}'
  ],
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'json',
    'node'
  ],
  watchPlugins: [
    './node_modules/jest-watch-typeahead/filename.js',
    './node_modules/jest-watch-typeahead/testname.js'
  ]
};
