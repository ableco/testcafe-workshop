import { Selector } from "testcafe";
import { testAccount } from "../roles";

fixture("Fixture").beforeEach(async t => {
  await t.useRole(testAccount)
});

test("Team member info", async t => {
  await t
    .click(Selector("a").withExactText("Team"))
    .typeText(Selector(".search__box"), "alb")
    .click(Selector("a").withText("Alberto Molero"))
    .click(Selector("a").withExactText("Information"))
    .expect(Selector(".member li").nth(0).find("a").textContent).eql("amolero@able.co")
    .expect(Selector(".member li").nth(1).find("p").textContent).eql("amolero")
    .expect(Selector(".member li").nth(2).find("a").textContent).contains("Lima")
    .expect(Selector(".member li").nth(3).find("p").textContent).eql("August 23")
    .expect(Selector(".member li").nth(4).find("p").textContent).eql("Joined October 1, 2018");
});
