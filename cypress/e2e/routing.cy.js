import { URL } from "../../src/constants/constants";

describe('app works correctly with routes', function() {
  before(function() {
    cy.visit(URL);
  });

  it('should open start page by default', function() {
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });

  it('should open string page after click on link', function() {
    cy.visit(`${URL}/recursion`);
    cy.get('h3').contains('Строка');
  });

  it('should open string page after click on link', function() {
    cy.visit(`${URL}/fibonacci`);
    cy.get('h3').contains('Последовательность Фибоначчи');
  });

  it('should open string page after click on link', function() {
    cy.visit(`${URL}/sorting`);
    cy.get('h3').contains('Сортировка массива');
  });

  it('should open string page after click on link', function() {
    cy.visit(`${URL}/stack`);
    cy.get('h3').contains('Стек');
  });

  it('should open string page after click on link', function() {
    cy.visit(`${URL}/queue`);
    cy.get('h3').contains('Очередь');
  });

  it('should open string page after click on link', function() {
    cy.visit(`${URL}/list`);
    cy.get('h3').contains('Связный список');
  });

}); 