describe("Recording 2/9/2023 at 2:54:22 PM", () => {
it("tests Recording 2/9/2023 at 2:54:22 PM", () => {
  cy.viewport(1595, 741);

  cy.visit("http://localhost:6969/reports");

  cy.get("[data-id=storeNo] > div > div > div.ng-input").click();

  cy.get("#selectAll").click();

  cy.get("[data-id=storeNo] > div > span").click();

  });
});
//# recorderSourceMap=BCCECGCICKC
