import { Selector, t } from 'testcafe';
import DropdownActions from './dropdown_actions';

const dropdownActions = new DropdownActions();

export default class CreateProjectPageModel {
  constructor() {
    this.projectTitleTextField = Selector('#project_title');
    this.impactTextField = Selector('#project_impact');
    this.projectDescriptionTextArea = Selector('#project_description');
    this.focusAreasDropdown = Selector('div').withAttribute('data-react-select-name', 'project[focus_area_ids][]');
    this.volunteersNeededDropdown = Selector('div').withAttribute(
      'data-react-select-name',
      'project[volunteers_needed_value]',
    );
    this.locationOnsiteRadioButton = Selector('input').withAttribute('id', 'project[location]_on_site');
    this.locationCityTextField = Selector('.form-text-field').withAttribute(
      'name',
      'project[address_attributes][city]',
    );
    this.locationCityInitialsDropdown = Selector('.form-field--quarter-size .react-select__value-container');
    this.estimatedTimeCommitmentDropdown = Selector('div').withAttribute(
      'data-react-select-name',
      'project[time_commitment]',
    );
    this.barLicenseRequired = Selector('#jurisdiction-form-field');
    this.supervisionYesRadioButton = Selector('input').withAttribute('id', 'project_supervision_required_true');
    this.mentorshipYesRadioButton = Selector('input').withAttribute('id', 'project_mentorship_required_true');
    this.trainingProvidedRadioButton = Selector('input').withAttribute('id', 'project_training_required_true');
    this.trainingDetailsTextArea = Selector('#project_training_schedule');
    this.publishProjectButton = Selector('.project-form__action-buttons .button--primary');
    this.volunteerCoordinatorDropdown = Selector('div').withAttribute(
      'data-react-select-name',
      'project[coordinator_id]',
    );
  }

  async fillProjectFromWithMandatoryFields(projectContent) {
    await t
      .typeText(this.projectTitleTextField, projectContent.title, {
        replace: true,
      })
      .typeText(this.impactTextField, projectContent.impact, {
        replace: true,
      })
      .typeText(this.projectDescriptionTextArea, projectContent.description, {
        paste: true,
        replace: true,
      })
      .click(this.focusAreasDropdown);

    projectContent.focusAreas.forEach(async function(area) {
      await dropdownActions.selectDropdownItemByOption(area);
    });

    await t.pressKey('esc').click(this.volunteersNeededDropdown);
    await dropdownActions.selectDropdownItemByOption(projectContent.volunteersNeeded);

    await t
      .click(this.locationOnsiteRadioButton)
      .typeText(this.locationCityTextField, projectContent.city, {
        replace: true,
      })
      .click(this.locationCityInitialsDropdown);

    await dropdownActions.selectDropdownItemByOption(projectContent.cityInitials);

    await t.pressKey('esc').click(this.estimatedTimeCommitmentDropdown);

    await dropdownActions.selectDropdownItemByOption(projectContent.estimatedTimeCommitment);

    await t.click(this.barLicenseRequired);

    projectContent.barLicenses.forEach(async function(license) {
      await dropdownActions.selectDropdownItemByOption(license);
    });

    await t
      .pressKey('esc')
      .click(this.supervisionYesRadioButton)
      .click(this.mentorshipYesRadioButton)
      .click(this.trainingProvidedRadioButton)
      .typeText(this.trainingDetailsTextArea, projectContent.trainingDescription, { replace: true });

    if (projectContent.volunteerCoordinator) {
      await t.click(this.volunteerCoordinatorDropdown);
      await dropdownActions.selectDropdownItemByOption(projectContent.volunteerCoordinator);
    }
    await t.pressKey('esc').click(this.publishProjectButton);
  }
}