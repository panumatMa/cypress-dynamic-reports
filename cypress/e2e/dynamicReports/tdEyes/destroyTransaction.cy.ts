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
  datePatternDateTime,
  REPORT_TYPE,
  testRequest,
} from "../../../support/utils";

describe("Destroy Transaction", () => {
  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Destroy Transaction");
  });

  describe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Export Destroy Transaction Report");
      checkReportTypeIcon(null);
    });
  });

  describe("Validate Date Criteria", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");
    });

    it("should enable Export button when insert value Date From", () => {
      assignValueDateForm("createdDate");

      cy.get("#btnExport").should("not.be.disabled");
    });

    it("should enable Export button when insert value Date To", () => {
      assignValueDateTo("createdDate");

      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("https://api-green.tdshop.io/destroys/export?**", "GET", (req: any) => {
        const url = decodeURIComponent(req.url);
        expect(url).to.include("timezone=+07:00");
        expect(url).to.match(datePatternDateTime('createdDateFrom'));
        expect(url).to.match(datePatternDateTime('createdDateTo'));
        expect(url).to.include("storeType=PARTNER_MODEL,STORE_MODEL");
        expect(url).to.include("storeNo=005798,005350,005799");
      });

      assignValueDateFormTo("createdDate");
      assignValueDropdown("storeType", 1);
      assignValueDropdown("storeType", 2);

      assignValueSelectMultipleDropdown("storeNo");

      cy.get("#btnExport").click();
    });
  });
});
