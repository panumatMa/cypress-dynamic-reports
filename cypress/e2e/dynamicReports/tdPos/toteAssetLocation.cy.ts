import { authentication, checkReportHeaderName, checkReportTypeIcon, clickReport, REPORT_TYPE } from "../../../support/utils";

describe("Tote Asset Location", () => {
  beforeEach(() => {
    authentication();

    cy.get("#side-menu > li > a[href='/reports']").click();

    clickReport("Tote Asset Location");
  });

  describe("Modal", () => {
    it('should show right header', () => {
      checkReportHeaderName("Export Tote Asset Location Report")
    });

    it('should show right report type', () => {
      checkReportTypeIcon(REPORT_TYPE.DAY_MINUS_ONE)
    })
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
