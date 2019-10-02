import { Role } from 'testcafe';
import { baseUrl } from './config';
import LoginPageModel from './login_page_model';

const loginPage = new LoginPageModel();

export const loginAs = (userInformation) => {
  const role = Role(
    `${baseUrl()}/log_in`,
    async () => {
      await loginPage.login(userInformation);
    },
    { preserveUrl: true },
  );
  return role;
};

export const nonprofit = loginAs({
  email: 'nonprofit_admin_8@able.co',
  password: 'letmein1',
});

export const staff = loginAs({
  email: 'staff@able.co',
  password: 'letmein1',
});