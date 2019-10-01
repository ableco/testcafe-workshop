import axios from "axios";
import { authHeader } from "../helpers/authHeaderStore";
import { getOrganizationUsername } from "./request_helper";

axios.defaults.headers.common["Accept"] = "application/json";

const deletePortfolios = async portfolioRequests => {
  for (let request of portfolioRequests) {
    let portfolioId = JSON.parse(request.response.body).id;
    let organizationUserName = getOrganizationUsername(request.request);

    await axios
      .delete(
        `${
          process.env.API_URL
        }/${organizationUserName}/portfolios/${portfolioId}`,
        {
          headers: authHeader,
        },
      )
      .catch(function(error) {
        // eslint-disable-next-line no-console
        console.error(
          `[WARNING] There was a problem deleting portfolio ${portfolioId} via the API. Status Code: ${
            error.response.status
          }`,
        );
      });
  }
};

export { deletePortfolios };