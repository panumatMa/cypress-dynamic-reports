import {
    assignValueDateForm,
    assignValueDateFormTo,
    assignValueDateTo, assignValueSelectMultipleDropdown, authentication,
    checkReportHeaderName,
    checkReportTypeIcon,
    clickReport, testRequest
} from "../../../support/utils";

describe("Redeem Transaction", () => {

  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Redeem Transaction");
  });

  describe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Redeem Transaction Report");
      checkReportTypeIcon(null);
    });
  });

  describe("Validate Date Criteria", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");
    });

    it("should enable Export button when insert value Date From", () => {
      assignValueDateForm("transactionDate");

      cy.get("#btnExport").should("not.be.disabled");
    });

    it("should enable Export button when insert value Date To", () => {
      assignValueDateTo("transactionDate");

      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("/stores/redeem-transaction/export?**", "GET", (req: any) => {
        const url = decodeURIComponent(req.url);
        expect(url).to.include("timezone=+07:00");
        expect(url).to.include("transactionDateFrom=");
        expect(url).to.include("transactionDateTo=");
        expect(url).to.include('storeNo=005798,005350,005799');
      });

      assignValueDateFormTo("transactionDate");
      assignValueSelectMultipleDropdown("storeNo");

      cy.get("#btnExport").click();
    });
  });
});
