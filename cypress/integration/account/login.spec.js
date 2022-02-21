/// <reference types="cypress" />
// import { useUserStore } from '@/store';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/account');
  });

  it('未輸入帳密', () => {
    cy.login({ email: null, password: null });
    cy.checkToastContent('請輸入 Email 和 Password');
  });

  it('帳密輸入錯誤', () => {
    cy.login({ email: 'fake@email.com', password: 'Secret1' });
    cy.get('input[name=password]').should('not.have.value')
    cy.checkToastContent('輸入的信箱或密碼有誤');
  });

  it('登入成功', () => {
    cy.fixture('account.json').then(({ email, password }) => {
      cy.login({ email, password });
      cy.checkToastContent('登入成功');
      cy.location('pathname').should('eq', '/index');
      // console.log(useUserStore());
      // expect(localStorage.getItem('token')).to.exist();
    });
  });
});
