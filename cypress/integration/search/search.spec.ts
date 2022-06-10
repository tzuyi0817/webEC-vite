/// <reference types="cypress" />
import { subContent } from '@/utils/common';
import type { Types } from '@/types';

describe('search', () => {
  before(() => {
    cy.visit('/search');
  });

  beforeEach(() => {
    cy.fixture('ajax.json').as('ajax');
    cy.get('input[type="search"]').as('searchInput');
  });

  it('初進頁面商品顯示驗證', function () {
    cy.request(`${this.ajax.apiUrl}/ESHOP/search?keyword=&page=1`).then(({ status, body: data }) => {
      if (status !== 200) return;
      const [product] = data.products as Iterable<Types.Product>;
      cy.get('.post-header:first').should(header => {
        expect(header).to.have.text(subContent(product.name, 19));
      });
    });
  });

  it('搜尋功能', function () {
    const keywords = ['123', '葡萄', '咖啡', '2014'];
    keywords.forEach(keyword => {
      cy.get('@searchInput').type(keyword);
      cy.get('.search__bar > button').click();
      cy.request(`${this.ajax.apiUrl}/ESHOP/search?keyword=${keyword}&page=1`).then(({ status, body: data }) => {
        if (status !== 200) return;
        const [product] = data.products as Iterable<Types.Product>;
        
        product
          ? cy.get('.post-header:first').should('have.text', subContent(product.name, 19))
          : cy.get('.search__prompt > p').should('have.text', `找不到您所查詢「${keyword}」的相關商品`);
      });
      cy.get('@searchInput').clear();
    });
  });

  it('商品排序', () => {
    cy.sortProduct(3).then(({ priceA, priceB }) => {
      cy.wrap(priceA).should(priceA === priceB ? 'eq' : 'lt', priceB);
    });

    cy.sortProduct(2).then(({ priceA, priceB }) => {
      cy.wrap(priceA).should(priceA === priceB ? 'eq' : 'gt', priceB);
    });
  });
});