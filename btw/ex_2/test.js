import TestPMO from "./test_pmo";

const randomEmail = require("faker").internet.email();
const pmo = new TestPMO();

fixture("Fixture").page("https://btw-braver-staging.herokuapp.com");

test("Register a member", async t => {
  await t
    .click(pmo.communityLink)
    .click(pmo.joinToCommunityButton)
    .typeText(pmo.emailInput, randomEmail)
    .typeText(pmo.birthDateInput, "07/10/1990")
    .click(pmo.continueButton)
    .expect(pmo.checkYourEmailTitle.exists).ok();
});
