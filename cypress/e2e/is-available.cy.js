import { URL } from "../../src/constants/constants";

describe('service is available', function() {
  it('should be available on localhost:3000', function() {
    cy.visit(URL);
  });
}); 