const url = 'https://norma.nomoreparties.space/api';
const testUrl = 'http://localhost:4000';
const main = '[data-cy="main"]:first-of-type';
const burgerConstructor = '[data-cy="burgerConstructor"]';
const bun = '[data-cy="bun"]:first-of-type';
const sauce = '[data-cy="sauce"]:first-of-type';
const modal = '[data-cy="modal"]';
const modalCloseButton = '[data-cy="modalCloseButton"]';
const modalOverlay = '[data-cy="modalOverlay"]';
const orderButton = '[data-cy="orderButton"]';
const orderNumber = '[data-cy="orderNumber"]';

beforeEach(() => {
  cy.intercept('GET', `${url}/ingredients`, {
    fixture: 'ingredients.json'
  }).as('mockIngredients');
  cy.setCookie('accessToken', 'ACCESS_TOKEN');
  localStorage.setItem('refreshToken', 'REFRESH_TOKEN');
  cy.intercept('GET', `${url}/auth/user`, { fixture: 'user.json' }).as(
    'mockUser'
  );
  cy.intercept('POST', `${url}/orders`, { fixture: 'order.json' }).as(
    'mockOrder'
  );
  cy.visit(testUrl);
});

afterEach(() => {
  cy.clearCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

describe('e2e test for burger constructor page: adding ingredients to burger constructor', () => {
  it('should add ingredient from list to constructor', () => {
    cy.get(main).children('button').click();
    cy.get(burgerConstructor).should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get(sauce).children('button').click();
    cy.get(burgerConstructor).should('contain', 'Соус Spicy-X');
  });

  it('should add bun from list to constructor', () => {
    cy.get(bun).children('button').click();
    cy.get(burgerConstructor).should('contain', 'Краторная булка N-200i');
  });
});

describe('e2e test for burger constructor page: modals', () => {
  beforeEach(() => {
    cy.get(bun).click();
  });

  it('should open after click on card and after reload', () => {
    cy.get(modal).should('be.visible');
    cy.reload(true);
    cy.get(modal).should('be.visible');
  });

  it('should close by click on close button', () => {
    cy.get(modalCloseButton).click();
    cy.get(modal).should('not.exist');
  });

  it('should close by click on overlay', () => {
    cy.get(modalOverlay).click({ force: true });
    cy.get(modal).should('not.exist');
  });
});

describe('e2e test for burger constructor page: creating order', () => {
  it('should create order with chosen ingredients for auth user, open modal and clear constructor', () => {
    cy.get(orderButton).should('be.disabled');

    cy.get(bun).children('button').click();
    cy.get(main).children('button').click();
    cy.get(orderButton).should('be.enabled');

    cy.get(orderButton).click();
    cy.get(modal).should('be.visible');
    cy.get(orderNumber).should('contain.text', '52971');

    cy.get(modalCloseButton).click();
    cy.get(modal).should('not.exist');

    cy.get(burgerConstructor).should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get(burgerConstructor).should('not.contain', 'Краторная булка N-200i');
    cy.get(orderButton).should('be.disabled');
  });
});
