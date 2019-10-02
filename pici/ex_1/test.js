import { t } from 'testcafe';
import { baseUrl } from './config';
import LoginPageModel from './login_page_model';
import MemberCenterNavigatorPageModel from './member_center_navigator_page_model';

const loginPageModel = new LoginPageModel();
const memberCenterNavigatorPageModel = new MemberCenterNavigatorPageModel();

fixture('Login Tests').page(baseUrl());

test('logIn to PICI as an admin user', async () => {
  await loginPageModel.login({
    email: 'admin@able.co',
    password: 'letmein1',
  });

  await t.expect(memberCenterNavigatorPageModel.piciLogo.exists).ok();
});