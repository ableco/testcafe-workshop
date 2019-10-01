import { Selector } from "testcafe";

export default class LoginPageModel {
  constructor() {
    this.emailInput = Selector("input").withAttribute("name", "emailInput");
    this.passwordInput = Selector("input").withAttribute(
      "name",
      "passwordInput",
    );
    this.submitButton = Selector(".Button").withAttribute("type", "submit");
    this.navigationTabs = Selector(".NavigationTabs");
    this.errorMessage = Selector(".has-errors");
  }
}