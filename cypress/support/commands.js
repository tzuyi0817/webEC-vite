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

Cypress.Commands.add('login', ({ email, password }) => {
  cy.visit('/account');
  if (email && password) {
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
  }
  cy.get('footer > button').click();
});

Cypress.Commands.add('checkToastContent', (content) => {
  cy.get('.showToast__info').should(div => {
    expect(div).to.contain(content);
  });
});
