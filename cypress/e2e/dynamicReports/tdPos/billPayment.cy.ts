import { RouteHandler } from "cypress/types/net-stubbing";
import {
  assignValueFileType,
  authentication,
  checkReportHeaderName,
  checkReportTypeIcon,
  clickReport,
  REPORT_TYPE,
  assignValueDateFormTo,
  assignValueSelectMultipleDropdown,
  assignValueDropdown,
  testRequest,
} from "../../../support/utils";

describe("Bill Payment", () => {
  beforeEach(() => {
    authentication();

    cy.get("#side-menu > li > a[href='/reports']").click();

    clickReport("Bill Payment");
  });

  describe("Modal", () => {
    it("should show right header", () => {
      checkReportHeaderName("Export Bill Payment Report");
    });

    it("should show right report type", () => {
      checkReportTypeIcon(REPORT_TYPE.NEARLY_REAL_TIME);
    });
  });

  describe("Validate Date Criteria", () => {
    beforeEach(() => {
      cy.get("#btnExport").should("be.disabled");

      assignValueFileType();
    });

    it("should enable Export button when insert value Date From and Date To", () => {
      assignValueDateFormTo("saleDate");
      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("/stores/export/billPayment", "POST", (req: any) => {
        expect(req.body).to.include({
          timezone: "+07:00",
          // saleDateFrom: "2023-02-01",
          // saleDateTo: "2023-02-01",
          store: "005798,005350,005799",
          status: "AWAITING_CONFIRM,AWAITING_PAYMENT,NO_DATA",
          fileType: "XLSX",
        });
      });

      assignValueDateFormTo("saleDate");
      assignValueSelectMultipleDropdown("store");
      assignValueFileType();
      assignValueDropdown("status", 1);
      assignValueDropdown("status", 2);
      assignValueDropdown("status", 3);

      cy.get("#btnExport").click();
    });
  });
});
