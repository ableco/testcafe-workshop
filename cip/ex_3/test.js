import {
  getByText,
  getAllByText,
  getByLabelText,
  addTestcafeTestingLibrary,
} from '@testing-library/testcafe'

const randomEmail = require("faker").internet.email();

fixture("Fixture").beforeEach(async t => {
  await addTestcafeTestingLibrary(t);
}).page("https://cip-staging.herokuapp.com");

test("Sign Up", async t => {
  await t
    .click(getByText("Sign Up"))
    .typeText(getByLabelText("First name"), "Mikasa")
    .typeText(getByLabelText("Last name"), "Ackerman")
    .typeText(getByLabelText("Email Address"), randomEmail)
    .typeText(getByLabelText("Choose a password"), "12345678")
    .click(getByText("Get Started!"))
    .typeText(getByLabelText("Home Zip Code"), "72003")
    .typeText(getByLabelText("What's the name of your high school?"), "Maria Wall")
    .click(getByLabelText("When do you expect to graduate?"))
    .click(getByText("2020"))
    .click(getByText("Next: Your Scores"))
    .click(getByText("I'll add my scores later"))
    .click(getByText("I'll do this later"))
    .expect(getAllByText("Mikasa Ackerman").filterVisible()).ok();
});
