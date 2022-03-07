/// <reference types="cypress" />
import { subContent } from '@/utils/common';

describe('search', () => {
  const products = [];

  before(() => {
    cy.visit('/search');
    cy.fixture('ajax.json').then(({ apiUrl }) => {
      cy.request(`${apiUrl}/ESHOP/search?keyword=&page=1`).then(({ status, body: data }) => {
        if (status !== 200) return;
        Object.assign(products, data.products);
      });
    });
  });

  it('初進頁面商品顯示驗證', () => {
    const [product] = products ?? [];
    cy.get('.post-header:first').should(header => {
      expect(header).to.have.text(subContent(product.name));
    });
  });
});