/// <reference types="cypress" />

describe('footer', () => {
  before(() => {
    cy.visit('/index');
  });

  it('檢查是否有 4 種按鈕(首頁、搜尋、使用者詳情、購物車)', () => {
    const footer = ['home', 'search', 'profile', 'cart'];
    cy.get('.footer > li').each((li, index, collection) => {
      index === 0 && expect(collection).to.have.length(4);
      expect(li).to.have.text(footer[index]);
    });
  });

  it('點擊按鈕導到各頁面', () => {
    context('搜尋', () => {
      cy.get('.footer > li').eq(1).click();
      cy.location('pathname').should('eq', '/search');
      cy.get('.footer > li > a').eq(1).should('have.class', 'active');
    });

    context('使用者詳情', () => {
      cy.get('.footer > li').eq(2).click();

      if (!localStorage.getItem('token')) {
        cy.location('pathname').should('eq', '/account');
        cy.checkToastContent('請先登入帳號');
        cy.fixture('account.json').then(({ email, password }) => {
          cy.login({ email, password });
          cy.get('.footer > li').eq(2).click();
        });
      }
      cy.location('pathname').should('eq', '/user/1');
      cy.get('.footer > li > a').eq(2).should('have.class', 'active');
    });

    context('購物車', () => {
      cy.get('.footer > li').eq(3).click();
      cy.location('pathname').should('eq', '/cart');
      cy.get('.footer > li > a').eq(3).should('have.class', 'active');
    });

    context('首頁', () => {
      cy.get('.footer > li').eq(0).click();
      cy.location('pathname').should('eq', '/index');
      cy.get('.footer > li > a').eq(0).should('have.class', 'active');
    });
  });
});
