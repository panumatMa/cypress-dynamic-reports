import { authentication, clickReport } from "../support/utils";

describe("Tote Asset Location", () => {
  beforeEach(() => {
    authentication();

    cy.get("#side-menu > li > a[href='/reports']").click();

    clickReport("Tote Asset Location");
  });

  describe("Validate File Type Criteria", () => {

    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled")
    })

    it("should enable Export button when select File Type", () => {
      cy.wait(1000);

      cy.get("#fileType > div > span.ng-arrow-wrapper").click();

      cy.get('#fileType ng-dropdown-panel div.ng-option:nth-child(1)').click();

      cy.get("#btnExport").should("not.be.disabled")
    });
  });
});
