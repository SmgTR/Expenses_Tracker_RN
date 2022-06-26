module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  clearMocks: true,
  setupFiles: ['<rootDir>/setup-tests.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/config']
};
