import { authentication, checkReportHeaderName, checkReportTypeIcon, clickReport } from "../../support/utils";

describe("Money In", () => {
  beforeEach(() => {
    authentication();

    cy.get("#side-menu > li > a[href='/reports']").click();

    clickReport("Money In");
  });

  describe("Modal", () => {
    it('should show right header', () => {
      checkReportHeaderName("Money In Report");
    })

    it('should show right report type', () => {
      checkReportTypeIcon(null);
    })
  });

  describe("Validate Date Criteria", () => {

    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled")
    })

    it("should enable Export button when insert value Date From", () => {
  
      cy.get("[data-id=moneyInCreatedDateFrom]").click();
  
      // click calendal
      cy.get("bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(4) > span").click();
  
      cy.get("#btnExport").should("not.be.disabled")
    });

    it("should enable Export button when insert value Date To", () => {
      cy.get("#btnExport").should("be.disabled")
  
      cy.get("[data-id=moneyInCreatedDateTo]").click();
  
      // click calendal
      cy.get("bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(4) > span").click();
  
      cy.get("#btnExport").should("not.be.disabled")
    });
  });

  describe("Store", () => {
    it("should select multiple options in store", () => {
      cy.wait(1000);

      cy.get("#store > div > span.ng-arrow-wrapper").click();

      cy.get('[data-id=store] ng-dropdown-panel div.ng-option:nth-child(1)').click();
    
      cy.get("#store > div > span.ng-arrow-wrapper").click();
    
      cy.get('[data-id=store] ng-dropdown-panel div.ng-option:nth-child(2)').click();
    
      cy.get("#store > div > span.ng-arrow-wrapper").click();
    
      cy.get('[data-id=store] ng-dropdown-panel div.ng-option:nth-child(3)').click();

      cy.get("#store > div > span.ng-arrow-wrapper").click();
    
      cy.get('[data-id=store] ng-dropdown-panel div.ng-option:nth-child(4)').click();

      cy.get('[data-id=store] div.ng-value-container').find('div.ng-value').should('have.length', 4)
    });
  });

  describe("Export", () => {

    it('should export error when find on wrong criteria', () => {
      cy.get("#moneyInCreatedDateFrom").click();

      cy.get("body > bs-datepicker-container > div > div > div > div > bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(6) > span").click();
    
      cy.get("#moneyInCreatedDateTo").click();
    
      cy.get("body > bs-datepicker-container > div > div > div > div > bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(6) > span").click();
    
      cy.get("#store > div > div > div.ng-input > input[type=text]").click();
    
      cy.get('[data-id=store] ng-dropdown-panel div.ng-option:nth-child(1)').click();
    
      cy.get("#btnExport").click();

      cy.wait(3000);

      cy.get("div.modal-body div.alert-danger").should("contain.text", "No transactions during the selected time. Please try a different range.");
    });
  })
});
