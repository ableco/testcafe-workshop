import { t } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';

export default class DropdownActions {
  constructor() {
    this.dropdownOptions = ReactSelector('Option');
  }

  async selectDropdownItemByOption(option) {
    await t.click(this.dropdownOptions.withProps('label', option));
  }
}