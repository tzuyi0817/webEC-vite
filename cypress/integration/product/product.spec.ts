/// <reference types="cypress" />

describe('product', () => {
  const productId = 1;

  before(() => {
    cy.visit(`/product/${productId}`);
  });

  beforeEach(() => {
    cy.fixture('ajax.json').as('ajax');
    cy.get('.productContent__quantity > input').as('qualityInput');
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

  it('返回上頁按鈕', function () {
    cy.visit(`/search`);
    cy.visit(`/product/${productId}`);
    cy.get('.defaultBtn').click();
    cy.location('pathname').should('eq', '/search');
    cy.visit(`/product/${productId}`);
  });

  it('頁面 header 顯示正確商品名稱', function () {
    cy.request(`${this.ajax.apiUrl}/product/${productId}`).then(({ status, body: data }) => {
      if (status !== 200) return;
      const { product: { name } } = data;
      const sliceTitle = (name) => name.length > 15 ? name.slice(0, 15) + '...' : name;

      cy.get('.product.container').scrollTo(0, 350);
      cy.get('.header').should('have.text', sliceTitle(name));
    });
  });

  it('數量加減按鍵', () => {
    cy.get('.productContent__quantity > .nav > .up').click();
    cy.get('@qualityInput').should('have.value', 2);
    cy.get('.productContent__quantity > .nav > .down').click();
    cy.get('@qualityInput').should('have.value', 1);
    cy.get('.productContent__quantity > .nav > .down').should('have.attr', 'disabled');
  });

  it('數量輸入上限和下限判斷', function () {
    cy.request(`${this.ajax.apiUrl}/product/${productId}`).then(({ status, body: data }) => {
      if (status !== 200) return;
      const { product: { count } } = data;

      cy.get('@qualityInput').type('99');
      cy.get('@qualityInput').should('have.value', count);
      cy.get('.productContent__quantity > .nav > .up').should('have.attr', 'disabled');
    });
  });

  it('加入購物車按鈕', () => {
    cy.get('.productContent__quantity > .btnStyle').click();
    cy.get('.footer > li').eq(3).should(li => {
      expect(li.find('div')).have.text('1');
    });
  });
});