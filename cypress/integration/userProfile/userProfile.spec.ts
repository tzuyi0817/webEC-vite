/// <reference types="cypress" />
import { Types } from '@/types';
import { subContent } from '@/utils/common';

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
    cy.get('.userProfile__tab > li').eq(0).click();
    cy.request({
      url: `${this.ajax.apiUrl}/user/${userId}/profile`,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(({ status, body: data }) => {
      if (status !== 200) return;
      const { orderInfo } = data;
      orders.push(...orderInfo);
      const scheduled = orders.filter(order => order.Order_status?.id === OrderStatus.Scheduled);

      if (scheduled) {
        const [order] = scheduled;
        cy.get('.orderList > ul > li:first').should(li => {
          const orderListBox = li.find('.orderList__box');
          expect(li.find('.orderList__status')).have.text(order.Order_status?.orderStatus ?? '');
          expect(orderListBox.find('a > img')).have.attr('src', order.items?.[0].image ?? '');
          expect(orderListBox.find('.orderList__content > a > p')).have.text(subContent(order.items?.[0].name, 20) ?? '');
          expect(orderListBox.find('.orderList__content > p:first')).have.text(`x${order.items?.[0].Order_item.quantity}` ?? '');
          expect(orderListBox.find('.orderList__content > .amount')).have.text(`$${order.items?.[0].Order_item.price}` ?? '');
          expect(li.find('.orderList__amount > span')).have.text(`${order.items?.length} 商品`);
          expect(li.find('.orderList__amount > p > .amount')).have.text(`$${order.amount}`);
        });
      } else {
        cy.get('.orderList__none > p').should('have.text', '找不到訂單');
      }
    })
  });

  it('登出', function () {
    cy.get('.logoutBtn').click();
    cy.wrap(localStorage.getItem('token')).should('be.null');
    cy.window().its('store').invoke('useUserStore').its('user').its('id').should('not.exist');
    cy.location('pathname').should('eq', '/account');
    cy.checkToastContent('已成功登出');
  });
});