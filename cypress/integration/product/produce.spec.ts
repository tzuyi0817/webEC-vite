/// <reference types="cypress" />

describe('product', () => {
  const productId = 1;

  before(() => {
    cy.visit(`/product/${productId}`);
  });

  beforeEach(() => {
    cy.fixture('ajax.json').as('ajax');
  });

  it('確認商品資訊', function () {
    cy.request(`${this.ajax.apiUrl}/product/${productId}`).then(({ status, body: data }) => {
      if (status !== 200) return;
      const { product: { name, price, count, Product_category, description }, ratingAve } = data;

      cy.get('.productContent > h1:first').should('have.text', name);
      cy.get('.price').should('have.text', `$${price}`);
      cy.get('.productContent__stars > .rating').should('have.text', ratingAve);
      cy.get('.productContent__detail > div').then(div => {
        expect(div.eq(0)).to.have.text(`商品數量${count}`);
        expect(div.eq(1)).to.have.text(`類別${Product_category.name} `);
      });
      cy.get('.productContent__detail > .description').should('have.text', description);
    });
  });
});