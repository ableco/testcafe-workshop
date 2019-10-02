import { Selector } from 'testcafe';

export default class ModalProjectPageModel {
  constructor() {
    this.closeModalButton = Selector('.modal__close');
    this.confirmButton = Selector('.button--primary').withText('Confirm');
    this.deleteProjectButton = Selector('.button--danger');
  }
}
