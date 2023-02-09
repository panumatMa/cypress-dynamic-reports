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

describe("Promotion Compensate", () => {

  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Promotion Compensate");
  });

  describe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Promotion Compensate Report");
      checkReportTypeIcon(null);
    });
  });

  describe("Validate Date Criteria", () => {
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
      testRequest("/promotion-compensate/report?**", "GET", (req: any) => {
        const url = decodeURIComponent(req.url);
        expect(url).to.include("timezone=+07:00");
        expect(url).to.include("receiptDateFrom=");
        expect(url).to.include("receiptDateTo=");
        expect(url).to.include("storeType=PARTNER_MODEL");
        expect(url).to.include("supplierCode=1522229285");
        expect(url).to.include("classes=Q0100");
        expect(url).to.include("classes=Q0200");
        expect(url).to.include("classes=Q0300");
      });

      assignValueDateFormTo("receiptDate");
      assignValueDropdown("storeType", 1);
      assignValueDropdownWithTemplateOption("supplierCode", 1);
      assignValueDropdown("classes", 1);
      assignValueDropdown("classes", 2);
      assignValueDropdown("classes", 3);
      cy.get("#btnExport").click();
    });
  });
});
