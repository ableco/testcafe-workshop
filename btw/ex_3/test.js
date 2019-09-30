import {
  getByText,
  getByPlaceholderText,
  getAllByText,
  addTestcafeTestingLibrary,
} from '@testing-library/testcafe'

require("dotenv").config();
const randomEmail = require("faker").internet.email();

fixture("Fixture").beforeEach(async t => {
  await addTestcafeTestingLibrary(t);
}).page(process.env.APP_URL);

test("Register a member", async t => {
  await t
    .click(getByText("Community"))
    .click(getAllByText("Join the Braver community").nth(0))
    .typeText(getByPlaceholderText("Enter your email"), randomEmail)
    .typeText(getByPlaceholderText("MM/DD/YYYY"), "07/10/1990")
    .click(getByText("Continue"))
    .expect(getByText("Check your email").exists).ok();
});
