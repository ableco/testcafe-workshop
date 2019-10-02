import { Selector, t } from 'testcafe';

const a = Selector('a');

class UserActions {
  constructor(text) {
    this.profileOptions = a.withExactText(text);
  }
}

export default class MemberCenterNavigatorPageModel {
  constructor() {
    this.piciLogo = Selector('.icon-member-center');
    this.toDashboard = Selector('a').withExactText('Dashboard');
    this.toMembers = Selector('a').withText('Members');
    this.toProjects = Selector('.header-container a').withText('Projects');
    this.toCenters = Selector('a').withExactText('Centers');
    this.toResources = Selector('a').withExactText('Resources');
    this.toAdminCenter = Selector('a.switcher-button');
    this.avatar = Selector('.member-center-navigator-user').find(
      '.call-dropdown-box',
    );
    this.profileListOptions = [
      new UserActions('Profile'),
      new UserActions('(Edit)'),
      new UserActions('Account'),
      new UserActions('Log Out'),
    ];
  }
  async toUsersProfile() {
    await t.click(this.avatar).click(this.profileListOptions[0].profileOptions);
  }
  async toEditUsersProfile() {
    await t.click(this.avatar).click(this.profileListOptions[1].profileOptions);
  }
  async toUserAccount() {
    await t.click(this.avatar).click(this.profileListOptions[2].profileOptions);
  }
  async logout() {
    await t.click(this.avatar).click(this.profileListOptions[3].profileOptions);
  }
}