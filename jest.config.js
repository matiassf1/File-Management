/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  testMatch: ['**/?(*.)+(spec).ts?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};
