/// <reference types="cypress" />

describe('Register', () => {
  before(() => {
    cy.visit('/account');
    cy.get('.account__box > p > a').click();
  });

  it('UI Title', () => {
    cy.get('.header > span').should('have.text', '註冊');
  });

  it('UI Form', () => {
    cy.get('input[name=name]').should('be.visible');
    cy.get('input[name=email]').should('be.visible');
    cy.get('input[name=password]').should('be.visible');
    cy.get('input[name=confirmPassword]').should('be.visible');
  });

  it('點擊 Already have an account? 導到登入頁', () => {
    cy.get('.account__box > p > a').click();
    cy.get('.header > span').should('have.text', '登入');
    cy.get('.account__box > p > a').click();
  });

  it('輸入框未輸入 Name, email 和 password', () => {
    cy.register({
      name: null,
      email: 'fake@email.com',
      password: 'Secret1',
      confirmPassword: 'Secret1',
    });
    cy.checkToastContent('請輸入 Name 、 Email 和 Password');

    cy.register({
      name: 'fake',
      email: null,
      password: 'Secret1',
      confirmPassword: 'Secret1',
    });
    cy.checkToastContent('請輸入 Name 、 Email 和 Password');

    cy.register({
      name: 'fake',
      email: 'fake@email.com',
      password: null,
      confirmPassword: null,
    });
    cy.checkToastContent('請輸入 Name 、 Email 和 Password');
  });

  it('輸入的密碼和確認密碼不相同', () => {
    cy.register({
      name: 'fake',
      email: 'fake@email.com',
      password: 'Secret1',
      confirmPassword: 'Secret2',
    });
    cy.get('input[name=password]').should('not.have.value');
    cy.get('input[name=confirmPassword]').should('not.have.value');
    cy.checkToastContent('輸入的 Password 和 Confirm Password 不相同');
  });

  it('註冊成功', () => {
    const random = `${Math.random()}`.slice(-5);
    cy.register({
      name: `fake${random}`,
      email: `fake${random}@email.com`,
      password: '12345678',
      confirmPassword: '12345678',
    });
    cy.get('.header > span').should('have.text' ,'登入');
  });
});
