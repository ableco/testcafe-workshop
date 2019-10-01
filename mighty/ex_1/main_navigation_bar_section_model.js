import { Selector, t } from "testcafe";

export default class MainNavigationBarSectionModel {
  constructor() {
    this.searchBox = Selector(".SearchBox .InputText");
    this.addNewButton = Selector(".Header-secondary .Button--secondary");
    this.newPortfolioButton = Selector(
      ".Header-secondary .DropdownMenuItem",
    ).withExactText("New Portfolio");
    this.newHoldingButton = Selector(
      ".Header-secondary .DropdownMenuItem",
    ).withExactText("New Holding");
    this.newDealButton = Selector(
      ".Header-secondary .DropdownMenuItem",
    ).withExactText("New Deal");
    this.portfoliosLink = Selector(
      ".NavigationTabs .u-tabDefault",
    ).withExactText("Portfolios");
    this.companiesLink = Selector(
      ".NavigationTabs .u-tabDefault",
    ).withExactText("Companies");
    this.dashboardLink = Selector(
      ".NavigationTabs .u-tabDefault",
    ).withExactText("Dashboard");
    this.pipelineLink = Selector(".NavigationTabs .u-tabDefault").withExactText(
      "Pipeline",
    );

    this.organizationMenuButton = Selector(".OrganizationMenu-placeholder");
    this.organizationMenuItems = Selector(".OrganizationList-itemName");
    this.personalOrganizationButton = Selector(".UserInformation-name");
    this.newOrganizationButton = Selector(
      ".OrganizationMenu-listFooter .u-boldLink",
    );
    this.settingsLink = Selector(".NavigationTabs .u-tabDefault").withExactText(
      "Settings",
    );
    //View button is common for Deals & Holdings
    this.viewButtonOnFlashMessage = Selector(
      ".Alert-withButton .Button--secondary",
    );

    this.companyListNames = Selector(".CompanyCard-title");
  }

  async search(text) {
    await t.typeText(this.searchBox, text, { replace: true }).pressKey("enter");
  }

  async selectAddHoldingFromSubNavigationBar() {
    await t.click(this.addNewButton).click(this.newHoldingButton);
  }

  async goToOrganization(name) {
    await t
      .click(this.organizationMenuButton)
      .click(this.organizationMenuItems.withExactText(name));
  }
  async goToPersonalOrganization() {
    await t
      .click(this.organizationMenuButton)
      .click(this.personalOrganizationButton);
  }
  async validateCreatedCompany(companyName) {
    await t
      .click(this.companiesLink)
      .expect(this.companyListNames.withExactText(companyName))
      .ok();
  }
  async goToSettings() {
    await t.click(this.settingsLink);
  }
}