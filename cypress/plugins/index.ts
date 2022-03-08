/// <reference types="cypress" />
const { startDevServer } = require('@cypress/vite-dev-server');
const createdBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { resolve } = require('path');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('file:preprocessor', createdBundler({
    tsconfig: resolve(__dirname, '../../tsconfig.json'),
  }));

  on('dev-server:start', async (options) => startDevServer({ options }));
  return config;
}
