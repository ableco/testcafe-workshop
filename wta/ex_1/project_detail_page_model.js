import { Selector, t } from 'testcafe';

export default class ProjectDetailPageModel {
  constructor() {
    this.editProjectButton = Selector('.project-additional-info__button .button--primary');
    this.volunteerEmailTextField = Selector('.project-detail__sidebar #potential_lawyer_email');
    this.volunteerJoinButton = Selector('.project-detail__sidebar .button--primary');
    this.volunteerForThisProjectButton = Selector(
      '.project-detail__sidebar .volunteer-card__content .volunteer-button',
    );
    this.confirmVolunteerInProjectButton = Selector('.ReactModal__Content .button--primary');
    this.youHaveVolunteerTitle = Selector('.volunteer-card__title');
    this.youHaveVolunteerMessage = Selector('.volunteer-card__body');
    this.projectName = Selector('.project-detail__name');
    this.projectImpact = Selector('.project-detail__impact');
    this.projectPostedDate = Selector('.project-detail__created-at');
    this.projectDescription = Selector('.project-detail__description');
    this.projectTag = Selector('.project-card__tag');
    this.projectTimeCommitment = Selector('.time-commitment').parent();
    this.projectTrainingProvided = Selector('.training-required').parent();
    this.projectTrainingDetails = Selector('.project-additional-info__property-name')
      .withText('Additional Training Details:')
      .parent();
    this.projectSitePreference = Selector('.site-preference').parent();
    this.projectInfoAddress = Selector('.project-additional-info__address');
    this.projectBarLicenseRequired = Selector('.project-additional-info__property-name')
      .withText('Bar License(s) required:')
      .parent();
    this.projectRequiredLanguages = Selector('.project-additional-info__property-name')
      .withText('Required Languages:')
      .parent();
    this.projectMentoringProvided = Selector('.project-additional-info__property-name')
      .withText('Mentoring Provided:')
      .parent();
    this.projectSupervisionProvided = Selector('.project-additional-info__property-name')
      .withText('Supervision Provided:')
      .parent();
  }

  async visitorVolunteerToProject(email) {
    await t.typeText(this.volunteerEmailTextField, email).click(this.volunteerJoinButton);
  }

  async volunteerForCurrentProject() {
    await t.click(this.volunteerForThisProjectButton).click(this.confirmVolunteerInProjectButton);
  }
}