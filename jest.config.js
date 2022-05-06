module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/libs/**', // to ignore libs coverage at this moment
    '!src/models/**',
    '!src/bootstrap.ts',
    '!src/app.ts',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/constants/**',
  ],
  coverageDirectory: 'coverage',
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
};
