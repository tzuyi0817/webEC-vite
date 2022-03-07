/// <reference types="cypress" />
import { subContent } from '@/utils/common';
import { Types } from '@/types';

describe('search', () => {
  const products: Types.Product[] = [];

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
    const [product] = products as Iterable<Types.Product>;
    cy.get('.post-header:first').should(header => {
      expect(header).to.have.text(subContent(product.name, 19));
    });
  });
});