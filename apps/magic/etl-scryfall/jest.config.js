const { resolve } = require('path');

module.exports = {
  displayName: 'magic-etl-scryfall',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/apps/magic/etl-scryfall',
  roots: ['<rootDir>', resolve('__mocks__')],
};
