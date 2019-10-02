import { Selector, t } from 'testcafe';

export default class LoginPageModel {
  constructor() {
    this.emailInputText = Selector('#session_email');
    this.passwordInputText = Selector('#session_password');
    this.logInButton = Selector('input').withAttribute('name', 'commit');
  }

  async login(userInformation) {
    await t
      .typeText(this.emailInputText, userInformation.email, { paste: true })
      .typeText(this.passwordInputText, userInformation.password)
      .click(this.logInButton);
  }
}