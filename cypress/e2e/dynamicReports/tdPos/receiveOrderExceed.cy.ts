import {
    assignValueDateForm,
    assignValueDateFormTo,
    assignValueDateTo,
    assignValueDropdown,
    assignValueDropdownWithTemplateOption, authentication,
    checkReportHeaderName,
    checkReportTypeIcon,
    clickReport, testRequest
} from "../../../support/utils";

describe("Receive Order Exceed", () => {

  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Receive Order Exceed");
  });

  describe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Export Receive Order Exceed Report");
      checkReportTypeIcon(null);
    });
  });

  describe("Validate Date Criteria", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");
    });

    it("should enable Export button when insert value Date From", () => {
      assignValueDateForm("receiveOrderDate");

      cy.get("#btnExport").should("not.be.disabled");
    });

    it("should enable Export button when insert value Date To", () => {
      assignValueDateTo("receiveOrderDate");

      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("/promotion-compensate/report?**", "GET", (req: any) => {
        const url = decodeURIComponent(req.url);
        expect(url).to.include("timezone=+07:00");
        expect(url).to.include("receiveOrderDateFrom=");
        expect(url).to.include("receiveOrderDateTo=");
      });

      assignValueDateFormTo("receiveOrderDate");
      cy.get("#btnExport").click();
    });
  });
});
