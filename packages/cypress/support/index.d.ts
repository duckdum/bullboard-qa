/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    /**
     * Inserts two completed jobs
     */
    insertJobs: () => void;
  }
}
