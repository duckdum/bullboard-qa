import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9000/',
    specPattern: 'e2e/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'support/index.js',
    fixturesFolder: 'fixtures',
    screenshotsFolder: 'screenshots',
    videosFolder: 'videos',
    downloadsFolder: 'downloads',
  },
});
