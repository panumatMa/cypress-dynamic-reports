import {
  assignValueDropdown, authentication,
  checkReportHeaderName,
  checkReportTypeIcon,
  clickReport, testRequest
} from "../../../support/utils";

describe("Destroy Document", () => {
  beforeEach(() => {
    authentication();
    cy.get("#side-menu > li > a[href='/reports']").click();
    clickReport("Destroy Document");
  });

  describe("Modal", () => {
    it("should show right header and icon", () => {
      checkReportHeaderName("Export Destroy Document Report");
      checkReportTypeIcon(null);
    });
  });

  describe("Request", () => {
    it("should send right request", () => {
      testRequest("/sales-summary/destroys/**/print/pdf/th?**", "GET", (req: any) => {
        const url = decodeURIComponent(req.url);
        expect(url).to.include("timezone=+07:00");
        expect(url).to.include("DT23-TH000084-0003");
      });

      assignValueDropdown("destroyDoc", 1);

      cy.get("#btnExport").click();
    });
  });
});
