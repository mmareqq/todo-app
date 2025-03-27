/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
   coverageProvider: 'v8',
   testEnvironment: 'node',
   testMatch: ['**/tests/**/*.test.js'],
   transform: {},
};

export default config;
