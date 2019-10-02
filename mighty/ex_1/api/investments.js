import axios from "axios";
import { authHeader } from "../helpers/authHeaderStore";
import { getOrganizationUsername } from "./request_helper";

axios.defaults.headers.common["Accept"] = "application/json";

const deleteInvestment = async investmentRequests => {
  for (let request of investmentRequests) {
    let investmentId = JSON.parse(request.response.body).id;
    let organizationUserName = getOrganizationUsername(request.request);

    await axios
      .delete(
        `${
          process.env.API_URL
        }/${organizationUserName}/investments/${investmentId}`,
        {
          headers: authHeader,
        },
      )
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(
          `[WARNING] There was a problem deleting investment ${investmentId} via the API. Status Code: ${
            error.response.status
          }`,
        );
      });
  }
};

const getInvestmentId = async investmentRequests => {
  let investmentId;
  for (let request of investmentRequests) {
    investmentId = JSON.parse(request.response.body).id;
  }
  return investmentId;
};

const deleteOrganization = async organizationRequests => {
  for (let request of organizationRequests) {
    let organizationId = JSON.parse(request.response.body).id;

    await axios
      .delete(`${process.env.API_URL}/organizations/${organizationId}`, {
        headers: authHeader,
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(
          `[WARNING] There was a problem deleting organization ${organizationId} via the API. Status Code: ${
            error.response.status
          }`,
        );
      });
  }
};

const deleteGeneratedInvestment = async (originAction, actionRequests) => {
  for (let request of actionRequests) {
    let actionResponse = JSON.parse(request.response.body);

    const organizationUserName = getOrganizationUsername(request.request);

    switch (originAction) {
      case "log acquisition":
        await deleteGeneratedInvestmentById(
          organizationUserName,
          originAction,
          actionResponse.equity_id,
        );
        break;
      case "log sale":
        await deleteGeneratedInvestmentById(
          organizationUserName,
          originAction,
          actionResponse.generated_investment_id,
        );
        break;
      case "log distribution":
        await deleteGeneratedInvestmentById(
          organizationUserName,
          originAction,
          actionResponse.equity.origin_action.child_investment.id,
        );
        break;
      case "loan conversion":
        await deleteGeneratedInvestmentById(
          organizationUserName,
          originAction,
          actionResponse.origin_action.child_investment.id,
        );
        break;
    }
  }
};

const deleteGeneratedInvestmentById = async (
  organizationUserName,
  originAction,
  generatedInvestmentId,
) => {
  await axios
    .delete(
      `${
        process.env.API_URL
      }/${organizationUserName}/investments/${generatedInvestmentId}`,
      {
        headers: authHeader,
      },
    )
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(
        `[WARNING] There was a problem deleting ${originAction}'s generated investment ${generatedInvestmentId} via the API. Status Code: ${
          error.response.status
        }`,
      );
    });
};

export {
  deleteInvestment,
  getInvestmentId,
  deleteOrganization,
  deleteGeneratedInvestment,
};