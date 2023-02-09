import {
    assignValueDateForm,
    assignValueDateFormTo,
    assignValueDateTo, assignValueSelectMultipleDropdown, authentication,
    checkReportHeaderName,
    checkReportTypeIcon,
    clickReport, datePatternDateTime, REPORT_TYPE, testRequest
} from "../../../support/utils";

describe("Supplier Coupon Reconcile Report", () => {

  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Supplier Coupon Reconcile Report");
  });

  describe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Export Supplier Coupon Reconcile Report");
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
      testRequest("/supplier-coupon-reconcile/export?**", "GET", (req: any) => {
        const url = decodeURIComponent(req.url);
        expect(url).to.include("timezone=+07:00");
        expect(url).to.include(datePatternDateTime("transactionDateFrom"));
        expect(url).to.include(datePatternDateTime("transactionDateTo"));
        expect(url).to.include('storeNo=005798,005350,005799');
      });

      assignValueDateFormTo("transactionDate");
      assignValueSelectMultipleDropdown("storeNo");

      cy.get("#btnExport").click();
    });
  });
});
