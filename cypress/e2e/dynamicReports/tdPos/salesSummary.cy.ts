import {
  assignValueDateForm,
  assignValueDateFormTo,
  assignValueDateTo,
  assignValueDropdown,
  assignValueSelectMultipleDropdown,
  authentication,
  checkReportHeaderName,
  checkReportTypeIcon,
  clickReport,
  datePatternDash,
  REPORT_TYPE,
  testRequest,
} from "../../../support/utils";

describe("Sales Summary", () => {
  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Sales Summary");
  });

  describe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Export Sales Summary Report");
      checkReportTypeIcon(REPORT_TYPE.DAY_MINUS_ONE);
    });
  });

  describe("Validate Date Criteria", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");
    });

    it("should enable Export button when insert value Date From Date To", () => {
      assignValueDateFormTo("createdDate");

      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("/sales-summary/export?**", "GET", (req: any) => {
        const url = decodeURIComponent(req.url);
        expect(url).to.include("timezone=+07:00");
        expect(url).to.match(datePatternDash('createdDateFrom'));
        expect(url).to.match(datePatternDash('createdDateTo'));
        expect(url).to.include("storeType=PARTNER_MODEL");
        expect(url).to.include("storeType=STORE_MODEL");
      });

      assignValueDateFormTo("createdDate");
      assignValueDropdown("storeType", 1);
      assignValueDropdown("storeType", 2);

      cy.get("#btnExport").click();
    });
  });
});
