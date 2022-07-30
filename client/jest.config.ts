import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'jest-expo',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js', './setupTest.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)/'],
  moduleNameMapper: { '\\.svg': '<rootDir>/__mocks__/svgMock.js' }
};

export default config;
