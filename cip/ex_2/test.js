import TestPom  from "./test_pmo";

const randomEmail = require("faker").internet.email();
const pom = new TestPom();

fixture("Fixture").page("https://cip-staging.herokuapp.com");

test("Sign Up", async t => {
  await t
    .click(pom.signUpButton)
    .typeText(pom.firstNameInput, "Mikasa")
    .typeText(pom.lastNameInput, "Ackerman")
    .typeText(pom.emailNameInput, randomEmail)
    .typeText(pom.passwordInput, "12345678")
    .click(pom.getStartedButton)
    .typeText(pom.zipCodeInput, "72003")
    .typeText(pom.highSchoolNameInput, "Maria Wall")
    .click(pom.graduationYearDropdown)
    .click(pom.graduationYearFirstItem)
    .click(pom.nextButton)
    .click(pom.addMyScoresLaterLink)
    .click(pom.doThisLaterLink)
    .expect(pom.profileHeader.textContent).eql("Mikasa Ackerman");
});
