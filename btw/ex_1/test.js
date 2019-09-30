import { Selector } from "testcafe";

require("dotenv").config();
const randomEmail = require("faker").internet.email();

fixture("Fixture").page(process.env.APP_URL);

test("Register a member", async t => {
  await t
    .click(Selector("a").withExactText("Community"))
    .click(Selector("a").withExactText("Join the Braver community").nth(0))
    .typeText(Selector("#email"), randomEmail)
    .typeText(Selector("#birthDate"), "07/10/1990")
    .click(Selector("button").withExactText("Continue"))
    .expect(Selector("h1").withExactText("Check your email").exists).ok();
});
