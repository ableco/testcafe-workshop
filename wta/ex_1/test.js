import { nonprofit } from './roles';
import MainPageModel from './main_page_model';
import CreateProjectPageModel from './create_project_page_model';
import ModalPageModel from './modal_page_model';
import ProjectDetailPageModel from './project_detail_page_model';
import faker from 'faker';

const mainPageModel = new MainPageModel();
const createProjectPageModel = new CreateProjectPageModel();
const modalPageModel = new ModalPageModel();
const projectDetailPageModel = new ProjectDetailPageModel();

fixture('Projects').beforeEach(async (t) => {
  await t.maximizeWindow().useRole(nonprofit);
});

test.meta({ id: 'C117755', smoke: 'true' })('Create a Project with mandatory fields', async (t) => {
  await t.click(mainPageModel.createNewProject);

  const projectTitle = `${faker.commerce.productName()} Project`;

  await createProjectPageModel.fillProjectFromWithMandatoryFields({
    title: projectTitle,
    impact: 'Any impact',
    description: 'Any description',
    focusAreas: ['Children/Youth', 'Criminal Justice'],
    volunteersNeeded: '1',
    city: 'Miami',
    cityInitials: 'MI',
    estimatedTimeCommitment: '6-10 hours',
    barLicenses: ['Delaware', 'Georgia'],
    supervision: 'Yes',
    mentorship: 'Yes',
    trainingDescription: 'Any training description',
    volunteerCoordinator: 'Gabriela Perez (nonprofit_admin_8@able.co)',
  });

  await t.click(modalPageModel.closeModalButton);

  await t
    .expect(projectDetailPageModel.projectName.textContent)
    .contains(projectTitle)
    .expect(projectDetailPageModel.projectImpact.textContent)
    .contains('Any impact')
    .expect(projectDetailPageModel.projectDescription.textContent)
    .contains('Any description')
    .expect(projectDetailPageModel.projectTag.withText('Children/Youth').exists)
    .ok()
    .expect(projectDetailPageModel.projectTag.withText('Criminal Justice').exists)
    .ok()
    .expect(projectDetailPageModel.projectTimeCommitment.textContent)
    .contains('6-10 hours')
    .expect(projectDetailPageModel.projectTrainingProvided.textContent)
    .contains('Yes')
    .expect(projectDetailPageModel.projectTrainingDetails.textContent)
    .contains('Any training description')
    .expect(projectDetailPageModel.projectSitePreference.textContent)
    .contains('On-Site')
    .expect(projectDetailPageModel.projectInfoAddress.textContent)
    .contains('Miami, MI')
    .expect(projectDetailPageModel.projectBarLicenseRequired.textContent)
    .contains('Delaware, Georgia')
    .expect(projectDetailPageModel.projectRequiredLanguages.textContent)
    .contains('None')
    .expect(projectDetailPageModel.projectMentoringProvided.textContent)
    .contains('Yes')
    .expect(projectDetailPageModel.projectSupervisionProvided.textContent)
    .contains('Yes');
});