import { Selector, t } from 'testcafe';
import ModalPageModel from './modal_page_model';

const modalPageModel = new ModalPageModel();

export default class MainPageModel {
  constructor() {
    this.bannerAlert = Selector('.banner--alert');
    this.joinLink = Selector('.global-header-link--sign-up');
    this.logInLink = Selector('.global-header-link--log-in');
    this.loggedUserLabel = Selector('.global-dropdown-user-first-name');
    this.dashboardOption = Selector('.global-header-link--dashboard');
    this.createNewProject = Selector('.nonprofit-dashboard-container .button--primary');
    this.volunteerLink = Selector('.global-header-link--projects');
    this.becomePartnerButton = Selector('.home-featured-nonprofits .button--medium');
    this.userProjectCard = Selector('.dashboard-project');
    this.userProjectDropdownMenu = Selector('.dropdown-menu-button');
    this.projectDropdownMenuListOption = Selector('.dropdown-menu-list__item');

    //admin side selectors
    this.tableRow = Selector('tbody > tr');
    this.staffNavBar = Selector('.navbar-nav a');
    this.staffNavBarOptions = {
      applications: this.staffNavBar.withText('Applications'),
      admins: this.staffNavBar.withText('Admins'),
    };
    this.createAdminButton = Selector('.btn-default').withText('Create Admin');
    this.adminFirstNameTextField = Selector('#staff_member_first_name');
    this.adminLastNameTextField = Selector('#staff_member_last_name');
    this.adminEmailTextField = Selector('#staff_member_email');
    this.createAdminFormButton = Selector('.btn-default').withAttribute('value', 'Create Admin');
    this.updateAdminFormButton = Selector('.btn-default').withAttribute('value', 'Update Admin');
    this.staffFlashMessage = Selector('.alert-info');
  }

  async deleteActiveProject(projectName) {
    const selectedProject = this.userProjectCard.withText(projectName);

    await t
      .click(selectedProject.find('.dropdown-menu-button'))
      .click(this.projectDropdownMenuListOption.withText('Delete Project'))
      .click(modalPageModel.deleteProjectButton);
  }

  async createAdmin(staff) {
    await t
      .typeText(this.adminFirstNameTextField, staff.firstName)
      .typeText(this.adminLastNameTextField, staff.lastName)
      .typeText(this.adminEmailTextField, staff.email)
      .click(this.createAdminFormButton);
  }

  async editStaffMember(staff) {
    const staffMemberTableRow = this.getTableContentByAttribute(staff.previousName);

    await t
      .click(staffMemberTableRow.actions.edit)
      .typeText(this.adminFirstNameTextField, staff.editedFirstName, {
        replace: true,
      })
      .typeText(this.adminLastNameTextField, staff.editedLastName, {
        replace: true,
      })
      .typeText(this.adminEmailTextField, staff.editedEmail, { replace: true })
      .click(this.updateAdminFormButton);
  }

  getTableContentByAttribute(attribute) {
    const selectedRow = this.tableRow.withText(attribute);
    const rowContent = {
      firstName: selectedRow.find('.dashboard-index-table__value--first_name'),
      lastName: selectedRow.find('.dashboard-index-table__value--last_name'),
      email: selectedRow.find('dashboard-index-table__value--email'),
      createdDate: selectedRow.find('.dashboard-index-table__value--created_at'),
      actions: {
        edit: selectedRow.find('.btn-default').withText('Edit'),
        delete: selectedRow.find('.btn-default').withText('Delete'),
      },
    };

    return rowContent;
  }
}
