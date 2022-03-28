/// <reference types="cypress" />
import { hideName, conversionTime, subContent } from '@/utils/common';

describe('product', () => {
  const productId = 1;
  let productResult;

  before(() => {
    cy.visit(`/product/${productId}`);
    cy.fixture('ajax.json').then(({ apiUrl }) => {
      cy.request(`${apiUrl}/product/${productId}`).then(({ status, body: data }) => {
        if (status !== 200) return;
        productResult = data;
      });
    });
  });

  beforeEach(() => {
    cy.get('.productContent__quantity > input').as('qualityInput');
  });

  it('確認商品資訊', function () {
    const { product: { name, price, count, Product_category, description }, ratingAve } = productResult;

    cy.get('.productContent > h1:first').should('have.text', name);
    cy.get('.price').should('have.text', `$${price}`);
    cy.get('.productContent__stars > .rating').should('have.text', ratingAve);
    cy.get('.productContent__detail > div').then(div => {
      expect(div.eq(0)).to.have.text(`商品數量${count}`);
      expect(div.eq(1)).to.have.text(`類別${Product_category.name} `);
    });
    cy.get('.productContent__detail > .description').should('have.text', description);
  });

  it('返回上頁按鈕', function () {
    cy.visit(`/search`);
    cy.visit(`/product/${productId}`);
    cy.get('.defaultBtn').click();
    cy.location('pathname').should('eq', '/search');
    cy.visit(`/product/${productId}`);
  });

  it('頁面 header 顯示正確商品名稱', function () {
    const { product: { name } } = productResult;
    const sliceTitle = (name) => name.length > 15 ? name.slice(0, 15) + '...' : name;

    cy.get('.product.container').scrollTo(0, 350);
    cy.get('.header').should('have.text', sliceTitle(name));
  });

  it('數量加減按鍵', () => {
    cy.get('.productContent__quantity > .nav > .up').click();
    cy.get('@qualityInput').should('have.value', 2);
    cy.get('.productContent__quantity > .nav > .down').click();
    cy.get('@qualityInput').should('have.value', 1);
    cy.get('.productContent__quantity > .nav > .down').should('have.attr', 'disabled');
  });

  it('數量輸入上限和下限判斷', function () {
    const { product: { count } } = productResult;

    cy.get('@qualityInput').type('99');
    cy.get('@qualityInput').should('have.value', count);
    cy.get('.productContent__quantity > .nav > .up').should('have.attr', 'disabled');
  });

  it('加入購物車按鈕', () => {
    cy.get('.productContent__quantity > .btnStyle').click();
    cy.get('.footer > li').eq(3).should(li => {
      expect(li.find('div')).have.text('1');
    });
  });

  it('評論區資訊', () => {
    const { ratingAve, product: { Comments } } = productResult;
    const [firstComment] = Comments;

    if (!firstComment) {
      cy.get('.productRating__stars > span').should('have.text', '此商品尚未有人評價');
      cy.get('.ratingList > .ratingList__Prompt').should('have.text', '此商品尚未有人評價');
      return;
    }

    cy.get('.productRating__stars > .rating').should('have.text', `${ratingAve} / 5`);
    cy.get('.productRating__stars > span:last').should('have.text', `(${Comments.length}則評價)`);
    cy.get('.ratingList > li:first > .ratingList__box').then(div => {
      expect(div.find('img')).have.attr('src', firstComment.User.image);
      expect(div.find('.ratingList__content > p:first')).have.text(hideName(firstComment.User.name));
      expect(div.find('.ratingList__content > p').eq(1)).have.text(firstComment.comment);
      expect(div.find('.ratingList__content > p:last')).have.text(conversionTime(firstComment.updatedAt));
    });
    cy.get('.productRating__footer > button').click();
    cy.location('pathname').should('eq', `${localStorage.getItem('token') ? `/rating/${productId}` : '/account'}`);
    cy.visit(`/product/${productId}`);
  });

  it('相似商品資訊', () => {
    const { productsFilter } = productResult;
    const { length } = productsFilter;

    if (!length) return;
    const randomIndex = Math.random() * length | 0;
    cy.get('.categoryProductsList > ul > li').then(li => {
      const { image, name, description, price, count, id } = productsFilter[randomIndex];
      const randomLi = li.eq(randomIndex);
      const post = randomLi.find('.card > .post');

      expect(post.find('img')).have.attr('src', image);
      expect(post.find('.post-content > .post-header')).have.text(subContent(name, 19));
      expect(post.find('.post-content > .post-text')).have.text(subContent(description, 35));
      expect(post.find('.post-content > .post-footer > div > p:first')).have.text(`$ ${price}`);
      expect(post.find('.post-content > .post-footer > div > p:last')).have.text(`還剩${count}件`);
      cy.wrap(post.find('.post-content > .post-footer > .btnStyle')).click();
      cy.location('pathname').should('eq', `/product/${id}`);
    });
  });
});