import {
    assignValueDateForm,
    assignValueDateFormTo,
    assignValueDateTo, assignValueSelectMultipleDropdown, authentication,
    checkReportHeaderName,
    checkReportTypeIcon,
    clickReport, datePatternDateTime, REPORT_TYPE, testRequest
} from "../../../support/utils";

describe("Voucher", () => {

  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Voucher");
  });

  xdescribe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Export Voucher Report");
      checkReportTypeIcon(null);
    });
  });

  xdescribe("Validate Date Criteria", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");
    });

    it("should enable Export button when insert value Date From", () => {
      assignValueDateForm("receiptDate");

      cy.get("#btnExport").should("not.be.disabled");
    });

    it("should enable Export button when insert value Date To", () => {
      assignValueDateTo("receiptDate");

      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("/vouchers/report?**", "GET", (req: any) => {
        const url = decodeURIComponent(req.url);
        expect(url).to.include("timezone=+07:00");
        expect(url).to.match(datePatternDateTime("receiptDateFrom"));
        expect(url).to.match(datePatternDateTime("receiptDateTo"));
      });

      assignValueDateFormTo("receiptDate");

      cy.get("#btnExport").click();
    });
  });
});
