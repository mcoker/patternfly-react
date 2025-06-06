describe('Search Input Demo Test', () => {
  it('Navigate to demo section', () => {
    cy.visit('http://localhost:3000/search-input-demo-nav-link');
  });

  it('Verify search input ref by clicking focus button', () => {
    cy.get('#focus_button').first().click();
    cy.focused().should('have.attr', 'placeholder', 'Find by name');
    cy.focused().blur();
  });

  it('Disabled search input is disabled', () => {
    cy.get('#disabled-search .pf-v6-c-text-input-group__text-input').should('be.disabled');
    cy.get('#disabled-search .pf-v6-c-input-group button').eq(0).should('be.disabled');
    cy.get('#disabled-search .pf-v6-c-input-group button').eq(1).should('be.disabled');
  });

  it('Verify search input with hint', () => {
    cy.get('#hinted-search .pf-v6-c-text-input-group__text-input').should('have.length', 2);
    const hint = cy.get('#hinted-search .pf-v6-c-text-input-group__text-input').eq(0);
    hint.should('be.disabled');
    hint.should('have.class', 'pf-m-hint');
    hint.should('have.value', 'hint');
    cy.get('#hinted-search .pf-v6-c-text-input-group__text-input').eq(1).should('not.be.disabled');
  });

  it('Verify search input and its handlers work', () => {
    cy.get('#enabled-search .pf-v6-c-badge').should('not.exist');
    cy.get('#enabled-search .pf-v6-c-text-input-group__utilities > button').should('not.exist');
    cy.get('#enabled-search .pf-v6-c-text-input-group__group').should('not.exist');

    cy.get('#enabled-search .pf-v6-c-text-input-group__text-input').type('Hello world');
    cy.get('#enabled-search .pf-v6-c-text-input-group__text-input').should('have.value', 'Hello world');

    cy.get('#enabled-search .pf-v6-c-badge').should('be.visible');
    cy.get('#enabled-search .pf-v6-c-text-input-group__utilities  > button').should('be.visible');
    cy.get('#enabled-search .pf-v6-c-text-input-group__group').should('be.visible');

    cy.get('#enabled-search .pf-v6-c-badge').should('have.text', '1 / 3 results');
    cy.get('#enabled-search .pf-v6-c-text-input-group__group button').last().click();
    cy.get('#enabled-search .pf-v6-c-badge').should('have.text', '2 / 3 results');
    cy.get('#enabled-search .pf-v6-c-text-input-group__group button').first().click();
    cy.get('#enabled-search .pf-v6-c-badge').should('have.text', '1 / 3 results');

    cy.get('#enabled-search .pf-v6-c-text-input-group__utilities  > button').click();
    cy.get('#enabled-search .pf-v6-c-text-input-group__text-input').should('not.have.value', 'Hello world');

    cy.get('#enabled-search .pf-v6-c-badge').should('not.exist');
    cy.get('#enabled-search .pf-v6-c-text-input-group__utilities  > button').should('not.exist');
    cy.get('#enabled-search .pf-v6-c-text-input-group__group').should('not.exist');
  });

  it('Verify advanced search and its handlers work', () => {
    cy.get('#enabled-search .pf-v6-c-panel').should('not.exist');
    cy.get('#enabled-search .pf-v6-c-input-group .pf-v6-c-input-group__item >  button').eq(0).click();
    cy.get('#enabled-search .pf-v6-c-panel').should('be.visible');

    cy.get('#enabled-search .pf-v6-c-form-control > input').eq(0).type('test');
    cy.get('#enabled-search .pf-v6-c-text-input-group__text-input').should('have.value', 'username:test');

    cy.get('#enabled-search .pf-v6-c-text-input-group__text-input').type(' firstname:hi another test');
    cy.get('#enabled-search .pf-v6-c-form-control > input').eq(1).should('have.value', 'hi');
    cy.get('#enabled-search .pf-v6-c-form-control > input').eq(2).should('have.value', 'another test');

    cy.get('#enabled-search .pf-v6-c-form__actions button').eq(1).click({ force: true });
    cy.get('#enabled-search .pf-v6-c-text-input-group__text-input').should('have.value', '');
    cy.get('#enabled-search .pf-v6-c-form-control > input').eq(1).should('have.value', '');
    cy.get('#enabled-search .pf-v6-c-form-control > input').eq(2).should('have.value', '');

    cy.get('#enabled-search .pf-v6-c-form-control > input').eq(0).type('test');
    cy.get('#enabled-search .pf-v6-c-form__actions button').eq(0).click({ force: true });
    cy.get('#enabled-search .pf-v6-c-form input').should('not.exist');
    cy.get('#enabled-search .pf-v6-c-text-input-group__text-input').should('have.value', 'username:test');
  });
});
