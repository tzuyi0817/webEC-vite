// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import type { Types } from '@/types';
import { subContent } from '@/utils/common';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(form: Types.LoginForm): Chainable<Subject>;
      register(form: Types.RegisterForm): Chainable<Subject>;
      checkToastContent(content: string): Chainable<Subject>;
      sortProduct(type: number): Chainable<{ priceA: string, priceB: string }>;
      checkOrderData(args: Types.CheckOrderArguments): Chainable<Subject>;
    }
  }
}

const subPrice = (str: string) => +str.replace('$ ', '');

Cypress.Commands.add('login', ({ email, password }) => {
  // cy.visit('/account');
  cy.get('input[name=email]').clear();
  cy.get('input[name=password]').clear();

  email && cy.get('input[name=email]').type(email);
  password && cy.get('input[name=password]').type(password);
  cy.get('footer > button').click();
});

Cypress.Commands.add('register', ({ name, email, password, confirmPassword }) => {
  cy.get('input[name=name]').clear();
  cy.get('input[name=email]').clear();
  cy.get('input[name=password]').clear();
  cy.get('input[name=confirmPassword]').clear();

  name && cy.get('input[name=name]').type(name);
  email && cy.get('input[name=email]').type(email);
  password && cy.get('input[name=password]').type(password);
  confirmPassword && cy.get('input[name=confirmPassword]').type(confirmPassword);
  cy.get('footer > button').click();
});

Cypress.Commands.add('checkToastContent', (content) => {
  cy.get('.showToast__info').should('have.text', content);
});

Cypress.Commands.add('sortProduct', (type) => {
  // 2:價格:高至低 3:價格:低至高
  cy.get('.cusSelBlock').click();
  cy.get('.cusSelBlock > .options > li').eq(type).click();
  cy.get('.post-footer').eq(0).find('p:first').invoke('text').then(priceA => {
    cy.get('.post-footer').eq(1).find('p:first').invoke('text').then(priceB => {
      return { priceA: subPrice(priceA), priceB: subPrice(priceB) };
    });
  });
});

Cypress.Commands.add('checkOrderData', ({ orders, type }: Types.CheckOrderArguments) => {
  const filterOrders = orders.filter(order => order.Order_status?.id === type);

  if (filterOrders.length) {
    const [order] = filterOrders;
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
});