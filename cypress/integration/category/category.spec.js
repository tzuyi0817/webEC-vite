/// <reference types="cypress" />

describe('category', () => {
  const categoryId = 1;

  before(() => {
    cy.visit(`/category/${categoryId}`);
  });

  it('UI Title', () => {
    // cy.get('.header > span').should('have.text', '');
  });
});
