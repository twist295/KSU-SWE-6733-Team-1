module.exports = {
  preset: 'react-native',
  // testEnvironmentOptions: {
  //   url: "http://localhost/"
  // },
  // testEnvironment: 'node',
  "moduleNameMapper": {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/mocks/fileMock.js"
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  // Load setup-tests.js before test execution,
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  setupFilesAfterEnv: ['<rootDir>setup-tests.js'],
};