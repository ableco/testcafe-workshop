import { Selector, t } from 'testcafe';

export default class LoginPageModel {
  constructor() {
    this.emailInputText = Selector('#session_email');
    this.passwordInputText = Selector('#session_password');
    this.logInButton = Selector('input').withAttribute('value', 'Log In');
    this.forgotPasswordLink = Selector('.login-forgot-password');
    this.forgotPasswordEmailInputText = Selector('#password_email');
    this.resetPasswordButton = Selector('input').withAttribute(
      'value',
      'Send Reset Password Instructions',
    );
    this.suspendedUserErrorMessage = Selector('article .alert-box p');
  }

  async login(userInformation) {
    await t
      .typeText(this.emailInputText, userInformation.email, { paste: true })
      .typeText(this.passwordInputText, userInformation.password, {
        paste: true,
      })
      .click(this.logInButton);
  }
  async recoverPassword(userInformation) {
    await t
      .click(this.forgotPasswordLink)
      .typeText(this.forgotPasswordEmailInputText, userInformation.email)
      .click(this.resetPasswordButton);
  }
}