import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './apps/client/tsconfig.json';

const config: { projects: Config.InitialOptions[] } = {
  projects: [
    {
      displayName: 'client',
      clearMocks: true,
      testRunner: 'jest-circus/runner',
      preset: 'jest-expo',
      testMatch: ['<rootDir>/apps/client/__tests__/**/*.test.ts?(x)'],
      transform: {
        '^.+\\.tsx$': ['babel-jest', { configFile: './apps/client/babel.config.js' }],
        '^.+\\.ts$': 'ts-jest',
      },
      moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/apps/client/__tests__/__mocks__/fileMock.js',
        ...pathsToModuleNameMapper(compilerOptions.paths, {
          prefix: '<rootDir>/',
        }),
      },
    },
    {
      displayName: 'server',
      clearMocks: true,
      testRunner: 'jest-circus/runner',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/apps/server/__tests__/**/*.test.ts'],
    },
  ],
};

export default config;
