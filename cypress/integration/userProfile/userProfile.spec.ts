/// <reference types="cypress" />

import { LocalStorage } from "@/utils/common";

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

  it('確認是否進入正確的個人詳情', function() {
    cy.visit(`/user/${userId}`);
    cy.request({
      url: `${this.ajax.apiUrl}/get_current_user`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`
      }
    }).then(({ status, body: data }) => {
      if (status !== 200) return;
      const { name, image } = data;

      cy.get('.userProfile > header > p').should('have.text', name);
      cy.get('.userProfile > header > img').should('have.attr', 'src', image);
    });
  });
});