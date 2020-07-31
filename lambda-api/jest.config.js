module.exports = {
  name: "lambda-api",
  coverageDirectory: "coverage/apps/user-profile-api",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/testSetup.js"],
  setupFiles: ["<rootDir>/test/setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.dynamodb",
    "<rootDir>/.serverless",
    "<rootDir>/.webpack",
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  preset: "ts-jest",
};
