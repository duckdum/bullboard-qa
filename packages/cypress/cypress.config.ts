import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:9000/',
    specPattern: 'e2e/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'support/index.js',
    fixturesFolder: 'fixtures',
  },
});
