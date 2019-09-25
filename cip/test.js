fixture("Fixture").beforeEach(async t => {
});

test("Create new student", async t => {
  await t
    .navigateTo("https://cip-staging.herokuapp.com/signup");
});
