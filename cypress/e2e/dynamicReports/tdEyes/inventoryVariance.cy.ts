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

describe("Inventory Variance", () => {
  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Inventory Variance");
  });

  describe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Export Inventory Variance Report");
      checkReportTypeIcon(null);
    });
  });

  describe("Validate Date Criteria", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");
      cy.wait(1000);
      assignValueDropdown("storeNo", 1);
    });

    it("should enable Export button when insert value Created Job Date", () => {
      cy.get(`[data-id=createdDate]`).click();

      cy.get(
        "bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(4) > span"
      ).click();    

      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Validate Store", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");
      cy.get(`[data-id=createdDate]`).click();

      cy.get(
        "bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(4) > span"
      ).click();    
    });

    it("should enable Export button when Select store", () => {
      assignValueDropdown("storeNo", 1);

      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest(
        "https://api-green.tdshop.io/stores/count/inventoryVariance/nest/pdf/th?",
        "GET",
        (req: any) => {
          const url = decodeURIComponent(req.url);
          expect(url).to.include("timezone=+07:00");
          expect(url).to.match(datePatternDateTime('createdDate'));
          expect(url).to.include("storeNo=002418");
        }
      );

      cy.get(`[data-id=createdDate]`).click();
      cy.get(
        "bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(4) > span"
      ).click(); 

      cy.wait(1000);
      assignValueDropdown("storeNo", 1);

      cy.get("#btnExport").click();
    });
  });
});
