import { URL, elStateColors } from "../../src/constants/constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { testCircle } from "../../src/constants/constants";


describe('Фибоначчи: проверка компонентов', function() {
  beforeEach(function() {
    cy.visit(`${URL}/fibonacci`);
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.contains("Фибоначчи");
    cy.get("input").should("be.empty");
    cy.get("button").last().should("be.disabled");
  });

  it("Проверка корректности генерации чисел", function () {
      const inputValue = "7";
      const fibArr = [1 , 1, 2, 3, 5, 8, 13, 21];

      cy.get("input").as("currInput");
      cy.get("@currInput").type(inputValue);

      cy.get("button").contains("Рассчитать").as("currButton");
      cy.get("@currButton").contains("Рассчитать").click();

      cy.get(testCircle, {timeout: SHORT_DELAY_IN_MS * (fibArr.length + 1)})
        .as("circles")
        .should("have.length", fibArr.length)
        .each((item, index) => {
          expect(item).to.contain(`${fibArr[index]}`)
      });
  });
});