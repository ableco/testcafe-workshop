import faker from "faker";
import { loginAccount } from "./helpers/roles";
import {
  createInvestmentLogger,
  createPortfolioLogger,
} from "./helpers/request_loggers";
import { deleteInvestment } from "./api/investments";
import { deletePortfolios } from "./api/portfolios";
import MainNavigationBarSectionModel from "./main_navigation_bar_section_model";
import NewInvestmentPageModel from "./new_investment_page_model";

const main_navigation_bar_section_model = new MainNavigationBarSectionModel();
const new_investment_page_model = new NewInvestmentPageModel();

const companyName = faker.company.companyName();
const portfolioName = `Portfolio for ${companyName}`;

fixture("Create Company")
  .beforeEach(async t => {
    await t.maximizeWindow().useRole(loginAccount);
    await t.addRequestHooks(createInvestmentLogger, createPortfolioLogger);
  })
  .afterEach(async () => {
    await deleteInvestment(createInvestmentLogger.requests);
    await deletePortfolios(createPortfolioLogger.requests);
  });

test("New company is displayed on company list page | C65474", async () => {
  await main_navigation_bar_section_model.selectAddHoldingFromSubNavigationBar();

  await new_investment_page_model.selectInvestmentBasicInformation({
    company: companyName,
    portfolio: portfolioName,
    investmentType: "Equity",
  });

  await new_investment_page_model.inputEquityBasicDetails({
    series: "Series Seed",
    acquisitionDate: "04/21/2018",
    investmentAmount: "2",
    numberOfShares: "200",
  });
  await main_navigation_bar_section_model.validateCreatedCompany(companyName);
});