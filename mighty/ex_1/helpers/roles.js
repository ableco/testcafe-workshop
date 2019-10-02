import { Role, t } from "testcafe";
//import { baseUrl } from "./config";
import { setAuthHeader } from "./authHeaderStore";
import { sessionLogger } from "./request_loggers";
import LoginPageModel from "../login_page_model";

const page = new LoginPageModel();

const loginAccount = Role(
  `/login`,
  async t => {
    await login("admin@able.co", "password");
    //TODO: The TestCafe roles feature is trying to redirect again to the login
    //page causing the application get failed by this bug https://www.pivotaltracker.com/story/show/164989615
    //I have used the wait as workaround suggested here: https://github.com/DevExpress/testcafe/issues/2475#issuecomment-393188390
    //I'm not sure if the problem here is related to that specific issue, but the workaround works!
    await t.wait(5000);
  },
  { preserveUrl: true },
);

const login = async (user, password) => {
  await t
    .addRequestHooks(sessionLogger)
    .typeText(page.emailInput, user)
    .typeText(page.passwordInput, password)
    .click(page.submitButton);

  const authResponse = JSON.parse(sessionLogger.requests[0].response.body);
  const { id, token } = authResponse.authentication;
  setAuthHeader(id, token);
};

export { loginAccount };