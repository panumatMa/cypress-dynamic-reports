import {
  assignValueDateForm,
  assignValueDateFormTo, assignValueDateTo, assignValueDropdown, assignValueSelectAllDropdown, assignValueSelectMultipleDropdown, authentication,
  checkReportHeaderName,
  checkReportTypeIcon,
  clickReport,
  ERROR,
  REPORT_TYPE, testRequest
} from "../../../support/utils";

describe("Order Processing (Hold)", () => {
  beforeEach(() => {
    authentication();

    cy.get("#side-menu > li > a[href='/reports']").click();

    clickReport("Order Processing (Hold)");
  });

  describe("Modal", () => {
    it("should show right header", () => {
      checkReportHeaderName("Export Order Processing (Hold) Report");
    });

    it("should show right report type", () => {
      checkReportTypeIcon(null);
    });
  });

  describe("Validate Date Criteria", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");
    });

    it("should enable Export button when insert value Date From", () => {
      assignValueDateForm("requestedDate");
      
      cy.get("#btnExport").should("not.be.disabled");
    });

    it("should enable Export button when insert value Date To", () => {
      assignValueDateTo("requestedDate");
      
      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Validate Store 100", () => {
    it("should show error 100 stores", () => {
      testRequest("/z8hold-requests/export?**", "GET", (req: any) => {
        cy.contains("div.report-section span", ERROR.STORES100)
      });
      
      assignValueDateFormTo("requestedDate");
      assignValueSelectAllDropdown("storeNo");

      cy.get("#btnExport").click();
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("/z8hold-requests/export?**", "GET", (req: any) => {
        const url = decodeURIComponent(req.url)
        expect(url).to.include('timezone=+07:00');
        expect(url).to.include('requestedDateFrom=');
        expect(url).to.include('requestedDateTo=');
        expect(url).to.include('storeNo=005798,005350,005799');
      });

      assignValueDateFormTo("requestedDate");
      assignValueSelectMultipleDropdown("storeNo");

      cy.get("#btnExport").click();
    });
  });
});
