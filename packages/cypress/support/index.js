import './commands';
import '@percy/cypress';

Cypress.on('uncaught:exception', (err) => {
  return false;
});
