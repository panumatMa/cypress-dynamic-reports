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

describe("Inventory Inventory Count Transaction", () => {
  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Inventory Count Transaction");
  });

  describe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Export Inventory Inventory Count Transaction");
      checkReportTypeIcon(REPORT_TYPE.REAL_TIME);
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
      testRequest(
        "https://api-green.tdshop.io/inventory-count-transaction/export",
        "POST",
        (req: any) => {
          expect(req.body).to.include({
            fileType: "XLSX",
            storeNo: "TH000408",
            storeType: "PARTNER_MODEL,STORE_MODEL",
            timezone: "+07:00",
          });

          expect(req.body)
            .to.have.property("createdDateFrom")
            .that.match(new RegExp("\\d{4}-\\d{2}-\\d{2}"));

          expect(req.body)
            .to.have.property("createdDateTo")
            .that.match(new RegExp("\\d{4}-\\d{2}-\\d{2}"));
        }
      );

      assignValueDateFormTo("createdDate");
      assignValueDropdown("storeType", 1);
      assignValueDropdown("storeType", 2);

      assignValueSelectMultipleDropdown("storeNo");

      cy.get("#btnExport").click();
    });
  });
});
