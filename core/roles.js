import { Role } from "testcafe";
import DeviceAuthorization from "./authorization";

const loginAs = user => {
  const coreUser = Role(
    "https://core-able-co-rc.herokuapp.com",
    async t => {
      let deviceAuthorization = new DeviceAuthorization(user.token);
      await t.addRequestHooks(deviceAuthorization).maximizeWindow();
    },
    { preserveUrl: true }
  );
  return coreUser;
};

export const testAccount = loginAs({
  token: "YEKvUJGq2JC9XQXTYPssWP3K",
  name: "Test User",
  role: "Test Engineer"
});