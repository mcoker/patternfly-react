describe('Chip Group Demo Test', () => {
  it('Navigate to demo section', () => {
    cy.visit('http://localhost:3000/chip-demo-nav-link');
  });

  it('Verify tooltipPosition is passed to Tooltip', () => {
<<<<<<< HEAD
    cy.get('.pf-v6-c-label__content').focus();
    cy.get('.pf-v6-c-tooltip').should('have.class', 'pf-m-bottom');
=======
    cy.get('.pf-v5-c-chip').focus();
    cy.get('.pf-v5-c-tooltip').should('have.class', 'pf-m-bottom');
>>>>>>> main
  });
});
