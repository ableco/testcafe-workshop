import { RequestLogger } from "testcafe";

const sessionLogger = RequestLogger(
  { url: /\/session/, method: "POST" },
  { logResponseBody: true, stringifyResponseBody: true },
);

const createInvestmentLogger = RequestLogger(
  { url: /\/investments$/, method: "POST" },
  { logResponseBody: true, stringifyResponseBody: true },
);

const loanConversionLogger = RequestLogger(
  { url: /\/investments\/(.*)\/loan_conversions$/, method: "POST" },
  { logResponseBody: true, stringifyResponseBody: true },
);

const logDistributionLogger = RequestLogger(
  { url: /\/investments\/(.*)\/distributions$/, method: "POST" },
  { logResponseBody: true, stringifyResponseBody: true },
);

const createOrganizationLogger = RequestLogger(
  { url: /\/organizations$/, method: "POST" },
  { logResponseBody: true, stringifyResponseBody: true },
);

const createPortfolioLogger = RequestLogger(
  { url: /\/portfolios$/, method: "POST" },
  { logResponseBody: true, stringifyResponseBody: true },
);

const logSaleLogger = RequestLogger(
  { url: /\/investments\/(.*)\/sales$/, method: "POST" },
  { logResponseBody: true, stringifyResponseBody: true },
);

const logAcquisitionLogger = RequestLogger(
  { url: /\/investments\/(.*)\/investment_acquisitions$/, method: "POST" },
  { logResponseBody: true, stringifyResponseBody: true },
);

export {
  sessionLogger,
  createInvestmentLogger,
  loanConversionLogger,
  logDistributionLogger,
  createOrganizationLogger,
  createPortfolioLogger,
  logSaleLogger,
  logAcquisitionLogger,
};