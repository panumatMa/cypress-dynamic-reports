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