describe('Drawer Resize Demo Test', () => {
  it('Navigate to the drawer demo', () => {
    cy.visit('http://localhost:3000/drawer-resize-demo-nav-link');
  });

  it('Verify resizable drawer', () => {
    cy.get('.pf-v6-c-drawer__panel').should('have.css', 'flex-basis', 'max(24px, min(200px, 100%))');
    cy.get('.pf-v6-c-drawer__panel').should('have.class', 'pf-m-resizable');
    cy.get('.pf-v6-c-drawer').should('not.have.class', 'pf-m-expanded');
    cy.get('#toggleButton').click();
    cy.get('.pf-v6-c-drawer').should('have.class', 'pf-m-expanded');
    cy.get('.pf-v6-c-drawer__panel').should('not.have.css', 'overflow-anchor', 'none');
    cy.get('.pf-v6-c-drawer__splitter')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 300, clientY: 300 })
      .trigger('mouseup', { force: true });
    cy.get('.pf-v6-c-drawer__panel').should('have.css', 'overflow-anchor', 'none');
    cy.get('.pf-v6-c-drawer__splitter')
      .trigger('keydown', { key: ' ' })
      .type('{downArrow}')
      .type('{downArrow}')
      .type('{downArrow}');
  });
});
