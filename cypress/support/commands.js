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

Cypress.Commands.add('login', ({ email, password } = { email: null, password: null }) => {
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
