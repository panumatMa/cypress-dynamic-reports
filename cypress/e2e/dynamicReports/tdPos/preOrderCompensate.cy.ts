import {
  assignValueDateForm,
  assignValueDateFormTo, assignValueDateTo, assignValueDropdown, assignValueDropdownWithTemplateOption, assignValueFileType, assignValueSelectAllDropdown, assignValueSelectMultipleDropdown, authentication,
  checkReportHeaderName,
  checkReportTypeIcon,
  clickReport,
  ERROR,
  REPORT_TYPE, testRequest
} from "../../../support/utils";

describe("Pre Order Compensate", () => {
  beforeEach(() => {
    authentication();

    cy.get("#side-menu > li > a[href='/reports']").click();

    clickReport("Pre Order Compensate");
  });

  describe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Export Pre Order Compensate Report");
      checkReportTypeIcon(REPORT_TYPE.DAY_MINUS_ONE);
    });
  });

  describe("Validate Date Criteria", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");
      assignValueFileType();
    });

    it("should enable Export button when insert value Date From Date To", () => {
      assignValueDateFormTo("transactionDate");
      
      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("/preorder-transactions/compensate/export", "POST", (req: any) => {
        expect(req.body).to.include({
          timezone: "+07:00",
          // transactionDateFrom: "2023-02-01",
          // transactionDateTo: "2023-02-01",
          storeCode: "TH002448",
          supplierCode: "1522229285",
          fileType: "XLSX",
        });
      });

      assignValueDateFormTo("transactionDate");
      assignValueFileType();
      assignValueDropdownWithTemplateOption('storeCode', 1);
      assignValueDropdownWithTemplateOption('supplierCode', 1);
      cy.get("#btnExport").click();
    });
  });
});
