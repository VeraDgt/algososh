import { URL, elStateColors } from "../../src/constants/constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { testCircle } from "../../src/constants/constants";


describe('Стек: проверка компонентов', function() {
  beforeEach(function() {
    cy.visit(`${URL}/stack`);
    cy.contains("Добавить").as("btnAdd");
    cy.contains("Удалить").as("btnDelete");
    cy.contains("Очистить").as("btnReset")
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.contains("Стек");
    cy.get("input").should("be.empty");
    cy.get("@btnAdd").should("be.disabled");
  });

  it("Добавление элемента в стек, цвета элементов меняются", function () {
    const testValues = ["555", "12", "ole1"];
    testValues.forEach((value, index) => {
      cy.get("input").as("currInput");
      cy.get("@currInput").type(value);
      cy.get("@btnAdd").click();
      cy.get(testCircle)
      .each((circle, circIndex) => {
        circIndex === index
        ? cy
        .wrap(circle)
        .should("have.text", testValues[circIndex])  
        .and("have.css", "border", elStateColors.changing)
        : cy
        .wrap(circle)
        .should("have.text", testValues[circIndex])  
        .and("have.css", "border", elStateColors.default);
      });
      cy.wait(SHORT_DELAY_IN_MS);
    });
  });

  it("Удаление элемента из стека", function () {
    const testValues = ["555", "12", "ole1"];
    testValues.forEach((value) => {
      cy.get("input").type(value);
      cy.get("@btnAdd").click();
    });
    
    cy.get("@btnDelete").click();
    cy.get(testCircle)
    .each((value, index) => {
      index === testValues.length - 1
      ? cy
      .wrap(value)
      .should("have.text", testValues[index])
      .and("have.css", "border", elStateColors.changing)
      : cy
      .wrap(value)
      .should("have.text", testValues[index])
      .and("have.css", "border", elStateColors.default);
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle)
    .should("have.length", testValues.length - 1)
    .each((value, index) => {
      cy
      .wrap(value)
      .should("have.text", testValues[index])
      .and("have.css", "border", elStateColors.default);
    })
  });

  it("Поведение кнопки «Очистить»", function () {
    const testValues = ["555", "12", "ole1"];
    testValues.forEach((value) => {
      cy.get("input").type(value);
      cy.get("@btnAdd").click();
    });
    
    cy.get("@btnReset").click();
    cy.get(testCircle).should("not.exist");
  });
});