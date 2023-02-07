export enum REPORT_TYPE {
  REAL_TIME = 'Real time',
  DAY_MINUS_ONE = 'Day-1',
  NEARLY_REAL_TIME = 'Nearly real time'
}

export const authentication = () => {
    const {baseUrl, username_login, password_login } = Cypress.config() as any;
    
    cy.visit(baseUrl);

    cy.get("#username").click();

    cy.get("#username").type(username_login);

    cy.get("#password").click();

    cy.get("#password").type(password_login);

    cy.get("#btn-signin").click();
  };

export const clickReport = (reportName: string) => {
  cy.contains("div.report-section span", reportName).siblings("button").click();
}

export const checkReportHeaderName = (name:string) => {
  cy.get("div.modal-content > .modal-header > .modal-title").should("contain.text", name);
}

export const checkReportTypeIcon = (type: REPORT_TYPE | null) => {
  if(type === REPORT_TYPE.DAY_MINUS_ONE) {
    cy.get("div.modal-sub-header").should("contain.text", "Day-1");
    cy.get("div.modal-sub-header em.icon-report-day-1").should('exist')
  }else {
    cy.get("div.modal-sub-header").should('not.exist')
  }
} 