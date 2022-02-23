/// <reference types="cypress" />
// import { useUserStore } from '@/store';

describe('Login', () => {
  before(() => {
    cy.visit('/account');
  });

  it('UI Title', () => {
    cy.get('.header > span').should('have.text' ,'登入');
  });

  it('UI Form', () => {
    cy.get('input[name=email]').should('be.visible');
    cy.get('input[name=password]').should('be.visible');
  });

  it('點擊 view as guest 導到首頁', () => {
    cy.get('footer > p > a').click();
    cy.location('pathname').should('eq', '/index');
    cy.go(-1);
  });

  it("點擊 Don't have an account? 導到註冊頁", () => {
    cy.get('.account__box > p > a').click();
    cy.get('.header > span').should('have.text' ,'註冊');
    cy.get('.account__box > p > a').click();
  });

  it('未輸入帳密', () => {
    cy.login();
    cy.checkToastContent('請輸入 Email 和 Password');
  });

  it('帳密輸入錯誤', () => {
    cy.login({ email: 'fake@email.com', password: 'Secret1' });
    cy.get('input[name=password]').should('not.have.value');
    cy.checkToastContent('輸入的信箱或密碼有誤');
  });

  it('登入成功', () => {
    cy.fixture('account.json').then(({ email, password }) => {
      cy.login({ email, password }).should(() => {
        expect(localStorage.getItem('token')).to.be.not.null;
        expect(localStorage.getItem('email')).to.have.string(email);
        // console.log(useUserStore());
      });
      cy.checkToastContent('登入成功');
      cy.location('pathname').should('eq', '/index');
    });
  });
});
