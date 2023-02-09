import {
  assignValueDateFormTo, assignValueDropdown, assignValueSelectAllDropdown, assignValueSelectMultipleDropdown, authentication,
  checkReportHeaderName,
  checkReportTypeIcon,
  clickReport,
  ERROR,
  REPORT_TYPE, testRequest
} from "../../../support/utils";

describe("Bill Payment (Debt Collection)", () => {
  beforeEach(() => {
    authentication();

    cy.get("#side-menu > li > a[href='/reports']").click();

    clickReport("Bill Payment (Debt Collection)");
  });

  describe("Modal", () => {
    it("should show right header", () => {
      checkReportHeaderName("Export Bill Payment (Debt Collection) Report");
    });

    it("should show right report type", () => {
      checkReportTypeIcon(REPORT_TYPE.REAL_TIME);
    });
  });

  describe("Validate Date Criteria", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");
    });

    it("should enable Export button when insert value Date From and Date To", () => {
      assignValueDateFormTo("saleDate");
      
      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("/billings/export/billPayment?**", "GET", (req: any) => {
        const url = decodeURIComponent(req.url)
        expect(url).to.include('timezone=+07:00');
        expect(url).to.include('saleDateFrom=');
        expect(url).to.include('saleDateTo=');
        expect(url).to.include('store=005798,005350,005799');
        expect(url).to.include('status=AWAITING_CONFIRM,AWAITING_PAYMENT,NO_DATA');
      });

      assignValueDateFormTo("saleDate");
      assignValueDateFormTo("saleDate");
      assignValueSelectMultipleDropdown("store");
      assignValueDropdown("status", 1);
      assignValueDropdown("status", 2);
      assignValueDropdown("status", 3);

      cy.get("#btnExport").click();
    });
  });
});
