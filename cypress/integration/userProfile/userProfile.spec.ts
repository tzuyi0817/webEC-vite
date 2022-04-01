/// <reference types="cypress" />

describe('userProfile', () => {
  let userId;

  before(() => {
    cy.visit(`/account`);
    cy.fixture('account.json').then(({ email, password }) => {
      cy.login({ email, password }).should(() => expect(localStorage.getItem('token')).to.be.not.null);
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
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`
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

  it('登出', function () {
    cy.get('.logoutBtn').click();
    cy.wrap(localStorage.getItem('token')).should('be.null');
    cy.window().its('store').invoke('useUserStore').its('user').its('id').should('not.exist');
    cy.location('pathname').should('eq', '/account');
    cy.checkToastContent('已成功登出');
  });
});