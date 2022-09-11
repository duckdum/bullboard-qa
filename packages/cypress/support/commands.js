Cypress.Commands.add('insertJobs', () => {
  cy.request('GET', 'http://localhost:9000/job?title=UiTests');
  cy.request('GET', 'http://localhost:9000/job?title=UiTests');
});
