import { t } from "testcafe";

export default class DropdownActions {
  async selectDropdownOption(dropdown, dropdownList, option) {
    await t
      .hover(dropdown)
      .click(dropdown)
      .click(dropdownList.withExactText(option));
  }
}