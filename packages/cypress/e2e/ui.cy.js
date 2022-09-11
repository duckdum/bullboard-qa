const selectors = {
  cleanJobBtn: () => cy.get('[data-title="Clean"]'),
  jobTitle: () => cy.get('[data-testid="job-title"]'),
  completedQueues: () => cy.get('[data-testid="completed-queues"]'),
};
describe('ui tests', () => {
  it('should show chevrons if pagination is grater than 1', () => {
    cy.intercept('GET', '/ui/api/queues?activeQueue=testQueue&status=completed&page=1', {
      fixture: 'completed',
    });
    cy.intercept('GET', '/ui/api/queues?activeQueue=testQueue&status=failed&page=1', {
      fixture: 'failed',
    });
    cy.visit('/ui');
    cy.contains('COMPLETED').click();
  });
  it('should be able to clean a job', () => {
    cy.insertJobs();
    cy.visit('/ui');
    cy.contains('COMPLETED').click();
    selectors.completedQueues().then(($queuesCount) => {
      const queuesCount = $queuesCount.text();
      selectors
        .jobTitle()
        .first()
        .then(($firstJobTitle) => {
          const firstJobTitle = $firstJobTitle.text();
          cy.contains(firstJobTitle).should('be.visible');
          selectors.cleanJobBtn().first().click();
          cy.contains('Confirm').click();
          selectors.completedQueues().then(($finalQueuesCount) => {
            const finalQueuesCount = Number($finalQueuesCount.text());
            expect(finalQueuesCount).equal(queuesCount - 1);
            cy.contains(firstJobTitle).should('not.exist');
          });
        });
    });
  });
});
