/// <reference types="cypress" />
import { Types } from '@/types';

describe('userProfile', () => {
  let userId;
  let token = '';
  const orders: Types.Order[] = [];
  enum OrderStatus {
    Scheduled = 1,
    Processing,
    Completed,
    Cancelled,
  };

  before(() => {
    cy.visit(`/account`);
    cy.fixture('account.json').then(({ email, password }) => {
      cy.login({ email, password }).should(() => {
        expect(token = localStorage.getItem('token')!).to.be.not.null;
      });
      cy.window().its('store').invoke('useUserStore').its('user').its('id').should(id => userId = id);
    });
  });

  beforeEach(() => {
    cy.fixture('ajax.json').as('ajax');
  });

  it('確認是否進入正確的個人詳情', function () {
    cy.visit(`/user/${userId}`);
    cy.request({
      url: `${this.ajax.apiUrl}/get_current_user`,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(({ status, body: data }) => {
      if (status !== 200) return;
      const { name, image } = data;
      const actor = image ?? location.origin + '/src/assets/actor.jpg';

      cy.get('.userProfile > header > p').should('have.text', name);
      cy.get('.userProfile > header > img').should('have.attr', 'src', actor);
    });
  });

  it('標籤點擊後樣式', () => {
    const tab = ['排程中', '處理中', '已完成', '已取消'];

    tab.forEach((item, index) => {
      const li = cy.get('.userProfile__tab > li').eq(index);

      li.click();
      li.should('have.class', 'active');
      li.should('have.text', item);
    });
  });

  it('排程中訂單資料', function () {
    cy.get('.userProfile__tab > li').eq(OrderStatus.Scheduled - 1).click();
    cy.request({
      url: `${this.ajax.apiUrl}/user/${userId}/profile`,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(({ status, body: data }) => {
      if (status !== 200) return;
      const { orderInfo } = data;
      orders.push(...orderInfo);

      cy.checkOrderData({ orders, type: OrderStatus.Scheduled });
    })
  });

  it('處理中訂單資料', function () {
    cy.get('.userProfile__tab > li').eq(OrderStatus.Processing - 1).click();
    cy.checkOrderData({ orders, type: OrderStatus.Processing });
  });

  it('已完成訂單資料', function () {
    cy.get('.userProfile__tab > li').eq(OrderStatus.Completed - 1).click();
    cy.checkOrderData({ orders, type: OrderStatus.Completed });
  })

  it('已取消訂單資料', function () {
    cy.get('.userProfile__tab > li').eq(OrderStatus.Cancelled - 1).click();
    cy.checkOrderData({ orders, type: OrderStatus.Cancelled });
  })

  it('登出', function () {
    cy.get('.logoutBtn').click();
    cy.wrap(localStorage.getItem('token')).should('be.null');
    cy.window().its('store').invoke('useUserStore').its('user').its('id').should('not.exist');
    cy.location('pathname').should('eq', '/account');
    cy.checkToastContent('已成功登出');
  });
});
