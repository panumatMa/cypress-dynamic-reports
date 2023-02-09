import {
  assignValueDateFormTo,
  assignValueDropdown,
  assignValueDropdownWithTemplateOption,
  assignValueFileType,
  authentication,
  checkReportHeaderName,
  checkReportTypeIcon,
  clickReport,
  datePatternDash,
  REPORT_TYPE,
  testRequest,
} from "../../../support/utils";

describe("Sales Transaction", () => {
  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Sales Transaction");
  });

  xdescribe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Export Sales Transaction Report");
      checkReportTypeIcon(REPORT_TYPE.DAY_MINUS_ONE);
    });
  });

  xdescribe("Validate Date Criteria", () => {
    beforeEach(() => {
      assignValueFileType();
      cy.get("#btnExport").should("be.disabled");
    });

    it("should enable Export button when insert value Date From Date To", () => {
      assignValueDateFormTo("transactionDate");

      cy.get("#btnExport").should("not.be.disabled");
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("/sales-transactions/export", "POST", (req: any) => {
        expect(req.body).to.include({
          fileType: "XLSX",
          salesType: "MEMBER_REWARD,NORMAL",
          store: "002418",
          timezone: "+07:00",
        });

        expect(req.body)
          .to.have.property("transactionDateFrom")
          .that.match(new RegExp("\\d{4}-\\d{2}-\\d{2}"));

        expect(req.body)
          .to.have.property("transactionDateTo")
          .that.match(new RegExp("\\d{4}-\\d{2}-\\d{2}"));
      });

      assignValueDateFormTo("transactionDate");
      assignValueFileType();
      assignValueDropdownWithTemplateOption("store", 1);
      assignValueDropdown("salesType", 1);
      assignValueDropdown("salesType", 2);

      cy.get("#btnExport").click();
    });
  });
});
