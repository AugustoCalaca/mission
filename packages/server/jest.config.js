const pkg = require('./package');

module.exports = {
  name: pkg.name,
  displayName: pkg.name.toUpperCase(),
  testEnvironment: '<rootDir>/test/environment/mongodb',
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  coverageReporters: ['lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTestFramework.js'],
  globalSetup: '<rootDir>/test/setup.js',
  globalTeardown: '<rootDir>/test/teardown.js',
  resetModules: false,
  rootDir: './',
  reporters: ['default'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': require.resolve('@mission/babel-jest'),
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|jsx|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
};
