import { Method, RouteHandler } from "cypress/types/net-stubbing";

export enum REPORT_TYPE {
  REAL_TIME = "Real time",
  DAY_MINUS_ONE = "Day-1",
  NEARLY_REAL_TIME = "Nearly real time",
}

export enum ERROR {
  STORES100 = "Export limit exceeded (up to 100 stores).",
}

export const authentication = () => {
  const { baseUrl, username_login, password_login } = Cypress.config() as any;

  cy.visit(baseUrl);

  cy.get("#username").click();

  cy.get("#username").type(username_login);

  cy.get("#password").click();

  cy.get("#password").type(password_login);

  cy.get("#btn-signin").click();
};

export const clickReport = (reportName: string) => {
  const regex = new RegExp(`^${reportName}$`);
  cy.contains("div.report-section span", regex).siblings("button").click();
};

export const checkReportHeaderName = (name: string) => {
  cy.get("div.modal-content > .modal-header > .modal-title").should($div => {
    expect($div.text()).to.equal(name);
  })
};

export const checkReportTypeIcon = (type: REPORT_TYPE | null) => {
  if (type === REPORT_TYPE.DAY_MINUS_ONE) {
    cy.get("div.modal-sub-header").should("contain.text", "Day-1");
    cy.get("div.modal-sub-header em.icon-report-day-1").should("exist");
  } else if (type === REPORT_TYPE.NEARLY_REAL_TIME) {
    cy.get("div.modal-sub-header").should("contain.text", "Nearly real time");
    cy.get("div.modal-sub-header em.icon-report-nearly-time").should("exist");
  } else if (type === REPORT_TYPE.REAL_TIME) {
    cy.get("div.modal-sub-header").should("contain.text", "Real time");
    cy.get("div.modal-sub-header em.icon-report-real-time").should("exist");
  } else {
    cy.get("div.modal-sub-header").should("not.exist");
  }
};

export const assignValueDateForm = (name: string) => {
  // click calendal
  cy.get(`[data-id=${name}From]`).click();
  cy.get(
    "bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(4) > span"
  ).click();
};

export const assignValueDateTo = (name: string) => {
  // click calendal
  cy.get(`[data-id=${name}To]`).click();
  cy.get(
    "bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(4) > span"
  ).click();
};

export const assignValueDateFormTo = (name: string) => {
  // click calendal
  cy.get(`[data-id=${name}From]`).click();

  cy.get(
    "bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(4) > span"
  ).click();

  // click calendal
  cy.get(`[data-id=${name}To]`).click();
  cy.get(
    "bs-days-calendar-view > bs-calendar-layout > div.bs-datepicker-body > table > tbody > tr:nth-child(1) > td:nth-child(4) > span"
  ).click();
};

export const assignValueFileType = () => {
  cy.get("[data-id=fileType] > div > div > div.ng-input").click();

  cy.get(
    "[data-id=fileType] ng-dropdown-panel div.ng-option:nth-child(1)"
  ).click();
};

export const assignValueSelectMultipleDropdown = (name: string) => {
  cy.get(`[data-id=${name}] > div > div > div.ng-input`).click();

  cy.get("#item-0").click();

  cy.get("#item-1").click();

  cy.get("#item-2").click();

  cy.get(`[data-id=${name}] > div > span`).click();
};

export const assignValueDropdown = (name: string, index: number) => {
  cy.get(`[data-id=${name}] > div > div > div.ng-input`).click();

  cy.get(
    `[data-id=${name}] > ng-dropdown-panel > div > div:nth-child(2) > div:nth-child(${index})`
  ).click();
};

export const testRequest = (
  part: string,
  method: Method,
  fn: (req: RouteHandler) => void
) => {
  const { endpoint } = Cypress.config() as any;
  cy.intercept(method, `${endpoint}${part}`, (req) => {
    fn(req);
  });
};

export const assignValueSelectAllDropdown = (name: string) => {
  cy.get(`[data-id=${name}] > div > div > div.ng-input`).click();
  cy.wait(3000);
  cy.get("#selectAll").click();
  cy.get(`[data-id=${name}] > div > span`).click();
};

export const assignValueDropdownWithTemplateOption = (
  name: string,
  index: number = 1
) => {
  cy.get(`#${name} > div > span.ng-arrow-wrapper`).click();
  cy.get(`[data-id=${name}] ng-dropdown-panel div.ng-option:nth-child(${index})`).click();
};

export const datePatternDash = (fieldName:string) => new RegExp(`${fieldName}=\\d{4}-\\d{2}-\\d{2}`);
export const datePatternDateTime = (fieldName:string) => new RegExp(`${fieldName}=\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z`);

