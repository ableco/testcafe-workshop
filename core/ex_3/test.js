import {
  getByText,
  getByPlaceholderText,
  addTestcafeTestingLibrary,
} from '@testing-library/testcafe'
import { testAccount } from "../roles";

fixture("Fixture").beforeEach(async t => {
  await addTestcafeTestingLibrary(t);
  await t.useRole(testAccount)
});

test("Team member info", async t => {
  await t
    .click(getByText("Team"))
    .typeText(getByPlaceholderText("Search by name or role"), "alb")
    .click(getByText("Alberto Molero"))
    .click(getByText("Information"))
    .expect(getByText("amolero@able.co")).ok()
    .expect(getByText("amolero")).ok()
    .expect(getByText(/Lima/)).ok()
    .expect(getByText("August 23")).ok()
    .expect(getByText("Joined October 1, 2018")).ok();
});
