module.exports = {
  preset: 'react-native',
  // testEnvironmentOptions: {
  //   url: "http://localhost/"
  // },
  // testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  // Load setup-tests.js before test execution,
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  setupFilesAfterEnv: ['<rootDir>setup-tests.js'],
};