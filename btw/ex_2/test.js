import TestPMO from "./test_pmo";

require("dotenv").config();
const randomEmail = require("faker").internet.email();
const pmo = new TestPMO();

fixture("Fixture").page(process.env.APP_URL);;

test("Register a member", async t => {
  await t
    .click(pmo.communityLink)
    .click(pmo.joinToCommunityButton)
    .typeText(pmo.emailInput, randomEmail)
    .typeText(pmo.birthDateInput, "07/10/1990")
    .click(pmo.continueButton)
    .expect(pmo.checkYourEmailTitle.exists).ok();
});
