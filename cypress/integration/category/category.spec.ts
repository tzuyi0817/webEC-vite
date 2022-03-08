/// <reference types="cypress" />
import { Types } from '@/types';

interface DataType {
  category: Types.Category;
  products: Types.Product[];
  totalPage: number[];
  categories: Types.Category[];
}

describe('category', () => {
  const categoryId = 1;
  const resultData: Partial<DataType> = {};

  before(() => {
    cy.visit(`/category/${categoryId}`);
    cy.fixture('ajax.json').then(({ apiUrl }) => {
      cy.request(`${apiUrl}/Category/${categoryId}?page=1`).then(({ status, body: data }) => {
        if (status !== 200) return;
        Object.assign(resultData, data);
      });
    });
  });

  it('UI Title', () => {
    cy.get('.header > span').should('have.text', '商品類別');
  });

  it('類別標籤名稱', () => {
    const { categories: tabs } = resultData;

    cy.get('.navTabs > ul > li').each((li, index, collection) => {
      const { name } = tabs?.[index] ?? {};
      const button = li.find('button');
      index === 0 && expect(collection).to.have.length(tabs?.length ?? 0);
      expect(button).to.have.text(name ?? '');
    });
  });

  it('類別名稱是否正確', () => {
    const { name } = resultData.category ?? {};
    cy.get('.categoryProducts > p').first().should('have.text', name);
  });

  it('點擊商品 card 進入商品詳情', () => {
    const [product] = resultData.products as Iterable<Types.Product>;
    cy.get('.btnStyle:first').click();
    cy.location('pathname').should('eq', `/product/${product.id}`);
    cy.go(-1);
  });

  it('商品排序', () => {
    cy.sortProduct(3).then(({ priceA, priceB }) => {
      cy.wrap(priceA).should(priceA === priceB ? 'eq' : 'lt', priceB);
    });

    cy.sortProduct(2).then(({ priceA, priceB }) => {
      cy.wrap(priceA).should(priceA === priceB ? 'eq' : 'gt', priceB);
    });
  });

  it('scroll 無限加載商品資訊', () => {
    cy.get('.category.container').scrollTo('bottom');
    const lastPage = resultData?.totalPage?.slice(-1) ?? 1;

    cy.fixture('ajax.json').then(({ apiUrl }) => {
      cy.request(`${apiUrl}/Category/${categoryId}?key=price&value=desc&page=${lastPage}`).then(({ status, body: data }) => {
        if (status !== 200) return;
        const { name } = data.products.pop();

        name && cy.get('.post-header:last').should('have.text', name);
        cy.get('.categoryProductsList__Prompt').should(
          'have.text',
          name ? '已無更多商品' : '此類別暫無商品'
        );
      });
    });
  });
});
