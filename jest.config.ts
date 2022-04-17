module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: 'test/tsconfig.json',
      diagnostics: {
        ignoreCodes: ['TS151001'],
      },
    },
  },
  moduleDirectories: ['node_modules', 'src', './'],
  moduleFileExtensions: ['js', 'jx', 'json', 'ts', 'tsx'],
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/test/__setup__/setupFiles.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/__setup__/setupFilesAfterEnv.ts'],
  testEnvironment: 'jsdom',
  testRegex: '/test/.*?\\.(test|spec)\\.tsx?$',
  testURL: 'http://localhost:3000/',
  verbose: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
