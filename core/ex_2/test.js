import TestPom  from "./test_pmo";
import { testAccount } from "../roles";

const pom = new TestPom();

fixture("Fixture").beforeEach(async t => {
  await t.useRole(testAccount)
});

test("Team member info", async t => {
  await t
    .click(pom.teamMenu)
    .typeText(pom.searchBox, "alb")
    .click(pom.teamMembers.withText("Alberto Molero"))
    .click(pom.informationTab)
    .expect(pom.memberEmail.textContent).eql("amolero@able.co")
    .expect(pom.memberSlackUser.textContent).eql("amolero")
    .expect(pom.memberLocation.textContent).contains("Lima")
    .expect(pom.memberBirthDate.textContent).eql("August 23")
    .expect(pom.memberJoinedDate.textContent).eql("Joined October 1, 2018");
});

