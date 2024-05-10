import { URL, elStateColors } from "../../src/constants/constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { testCircle } from "../../src/constants/constants";


describe('Строка: проверка компонентов', function() {
  beforeEach(function() {
    cy.visit(`${URL}/recursion`);
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.contains("Строка");
    cy.get("input").should("be.empty");
    cy.get("button").last().should("be.disabled");
  });

  it("Строка разворачивается корректно", function () {
      const inputValue = "12345";

      cy.get("input").as("currInput");
      cy.get("@currInput").type(inputValue);

      cy.get("button").contains("Развернуть").as("currButton");
      cy.get("@currButton").contains("Развернуть").click();

      cy.get(testCircle)
      .as("circles")
      .each((item, index) => {
        switch (index) {
          case 0:
            cy.wrap(item)
            .should("have.text", inputValue[inputValue.length - 1 - index])
            .and("have.css", "border", elStateColors.modified);
          break;
          case inputValue.length - 1:
            cy.wrap(item)
            .should("have.text", inputValue[inputValue.length - 1 - index])
            .and("have.css", "border", elStateColors.modified);
          break;
          case 1:
            cy.wrap(item)
            .should("have.text", inputValue[index])
            .and("have.css", "border", elStateColors.changing);
          break;
          case inputValue.length - 2:
            cy.wrap(item)
            .should("have.text", inputValue[index])
            .and("have.css", "border", elStateColors.changing);
          break;
          default:
            cy.wrap(item)
            .should("have.text", inputValue[index])
            .and("have.css", "border", elStateColors.default);
          break;
      };
    });

    cy.get("@circles")
      .each((item, index) => {
        switch (index) {
          case 0:
            cy.wrap(item)
            .should("have.text", inputValue[inputValue.length - 1 - index])
            .and("have.css", "border", elStateColors.modified);
          break;
          case inputValue.length - 1:
            cy.wrap(item)
            .should("have.text", inputValue[inputValue.length - 1 - index])
            .and("have.css", "border", elStateColors.modified);
          break;
          case 1:
            cy.wrap(item)
            .should("have.text", inputValue[inputValue.length - 1 - index])
            .and("have.css", "border", elStateColors.modified);
          break;
          case inputValue.length - 2:
            cy.wrap(item)
            .should("have.text", inputValue[inputValue.length - 1 - index])
            .and("have.css", "border", elStateColors.modified);
          break;
          default:
            cy.wrap(item)
            .should("have.text", inputValue[index])
            .and("have.css", "border", elStateColors.modified);
          break;
      };
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .each((item, index) => {
        cy.wrap(item)
          .should("have.text", inputValue[inputValue.length - 1 - index])
          .and("have.css", "border", elStateColors.modified);
      });
  });
});