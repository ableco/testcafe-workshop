import { Selector } from "testcafe";

const randomEmail = require("faker").internet.email();

fixture("Fixture").page("https://cip-staging.herokuapp.com");

test("Sign Up", async t => {
  await t
    .click(Selector("a").withExactText("Sign Up"))
    .typeText(Selector("#TextInput-firstName"), "Mikasa")
    .typeText(Selector("#TextInput-lastName"), "Ackerman")
    .typeText(Selector("#TextInput-email"), randomEmail)
    .typeText(Selector("#TextInput-password"), "12345678")
    .click(Selector("button").withExactText("Get Started!"))
    .typeText(Selector("#TextInput-zipCode"), "72003")
    .typeText(Selector("#TextInput-highSchoolName"), "Maria Wall")
    .click(Selector("#Dropdown-expectedGraduationYear"))
    .click(Selector("#Dropdown-expectedGraduationYear").parent(0).find("li").nth(0))
    .click(Selector("button").withExactText("Next: Your Scores"))
    .click(Selector("button").withExactText("I'll add my scores later"))
    .click(Selector("button").withExactText("I'll do this later"))
    .expect(Selector("div").withAttribute("class", /ProfileHeader__name/).textContent).eql("Mikasa Ackerman");
});
