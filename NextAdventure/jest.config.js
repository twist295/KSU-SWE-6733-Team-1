module.exports = {
  preset: 'react-native',
  // testEnvironmentOptions: {
  //   url: "http://localhost/"
  // },
  // testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  // Load setup-tests.js before test execution
  setupFilesAfterEnv: ['<rootDir>setup-tests.js'],
};