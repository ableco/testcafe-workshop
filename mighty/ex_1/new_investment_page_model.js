import { Selector, t } from "testcafe";
import DropdownActions from "./helpers/dropdown_actions";
import MainNavigationBarSectionModel from "./main_navigation_bar_section_model";

const main_navigation_bar_section_model = new MainNavigationBarSectionModel();

const dropdown_actions = new DropdownActions();

export default class NewInvestmentPageModel {
  constructor() {
    // General fields for all investment types
    this.companyDropdown = Selector(".FormElement--company").find(".Combobox");
    this.portfolioDropdown = Selector(".FormElement--portfolio").find(
      ".Combobox",
    );
    this.investmentTypeButtonGroup = Selector(
      ".FormElement--tabButtonGroup .TabButtonGroup",
    );
    this.addHoldingButton = Selector(
      ".FullScreenModalFooter .Button--primary",
    ).withExactText("Add Holding");

    // Equity type investment fields
    this.equityFields = {
      seriesNameDropdown: Selector(
        ".Select-currentSelectionText",
      ).withExactText("Select series for this holding..."),
      seriesNameOptions: Selector(".SelectPopup").find("li .SelectOption"),
      acquisitionDateField: Selector(".FormElement--dateInput .InputText"),
      investmentAmountField: Selector(
        ".EquityFormTypeOfSalePriceAmount .InputHolder .InputText",
      ),
      numberOfSharesField: Selector(".FormElement--Quantity .InputText"),
    };

    // Debt type investment fields
    this.debtFields = {
      loanNameField: Selector(".FormElement--LoanName .InputText"),
      noteAmountField: Selector(".FormElement--TotalAmount .InputText"),
      issuanceDateField: Selector(".FormElement--dateInput .InputText"),
    };

    // Fund type investment fields
    this.fundFields = {
      fundNameField: Selector(".FormElement--FundName .InputText"),
      commitmentAmountField: Selector(".FormElement--TotalAmount .InputText"),
      investmentDateField: Selector(".FormElement--dateInput .InputText"),
    };

    // LLC type investment fields
    this.llcFields = {
      className: Selector(".FormElement--ClassName .InputText"),
      acquisitionCost: Selector(".FormElement--TotalAmount .InputText"),
      acquisitionDate: Selector(".FormElement--Date .InputText"),
      membershipUnitsOption: Selector(
        ".FormElement--radioButtonGroup .RadioGroupItem:nth-child(1)",
      ),
      numberOfUnits: Selector(".FormElement--Quantity .InputText"),
      membershipPercentageOption: Selector(
        ".FormElement--radioButtonGroup .RadioGroupItem:nth-child(2)",
      ),
      percentageAmount: Selector(
        ".FormElement--percentInput .InputText",
      ).withAttribute("name", "percentage_owned"),
    };

    // Option type investment fields
    this.optionName = Selector(".FormElement--OptionName .InputText");

    // Warrant type investment fields
    this.warrantName = Selector(".FormElement--WarrantName .InputText");

    // For Warrant and Option
    this.holdingFields = {
      acquisitionCost: Selector(".FormElement--TotalAmount .InputText"),
      quantity: Selector(".FormElement--Quantity .InputText"),
      acquisitionDate: Selector(
        ".FormElement--dateInput .InputText",
      ).withAttribute("label", "Acquisition date"),
    };
  }

  async selectInvestmentBasicInformation(investment) {
    if (investment.company) {
      await t
        .click(this.companyDropdown)
        .typeText(this.companyDropdown.find("input"), investment.company, {
          replace: true,
        })
        .pressKey("enter");
    }
    if (investment.portfolio) {
      await t
        .click(this.portfolioDropdown)
        .typeText(this.portfolioDropdown.find("input"), investment.portfolio, {
          replace: true,
        })
        .pressKey("enter");
    }

    await t.click(
      this.investmentTypeButtonGroup
        .find("button")
        .withExactText(investment.investmentType),
    );
  }

  async inputEquityBasicDetails(equity) {
    await dropdown_actions.selectDropdownOption(
      this.equityFields.seriesNameDropdown,
      this.equityFields.seriesNameOptions,
      equity.series,
    );

    await t
      .typeText(
        this.equityFields.acquisitionDateField,
        equity.acquisitionDate,
        {
          replace: true,
        },
      )
      .typeText(
        this.equityFields.investmentAmountField,
        equity.investmentAmount,
        {
          replace: true,
        },
      )
      .hover(this.equityFields.numberOfSharesField)
      .typeText(this.equityFields.numberOfSharesField, equity.numberOfShares, {
        replace: true,
      })
      .click(this.addHoldingButton)
      .click(main_navigation_bar_section_model.viewButtonOnFlashMessage);
  }

  async inputDebtBasicDetails(debt) {
    await t
      .typeText(this.debtFields.loanNameField, debt.loanName, { replace: true })
      .hover(this.debtFields.noteAmountField)
      .typeText(this.debtFields.noteAmountField, debt.noteAmount, {
        replace: true,
      })
      .typeText(this.debtFields.issuanceDateField, debt.issuanceDate, {
        replace: true,
      })
      .click(this.addHoldingButton)
      .click(main_navigation_bar_section_model.viewButtonOnFlashMessage);
  }

  async inputFundBasicDetails(fund) {
    await t
      .typeText(this.fundFields.fundNameField, fund.fundName, { replace: true })
      .typeText(this.fundFields.commitmentAmountField, fund.commitmentAmount, {
        replace: true,
      })
      .typeText(this.fundFields.investmentDateField, fund.investmentDate, {
        replace: true,
      })
      .click(this.addHoldingButton)
      .click(main_navigation_bar_section_model.viewButtonOnFlashMessage);
  }

  async inputLlcBasicDetails(llc) {
    await t
      .typeText(this.llcFields.className, llc.className, {
        replace: true,
      })
      .typeText(this.llcFields.acquisitionCost, llc.acquisitionCost, {
        replace: true,
      })
      .typeText(this.llcFields.acquisitionDate, llc.acquisitionDate, {
        replace: true,
      });

    if (llc.numberOfUnits) {
      await t
        .hover(this.llcFields.membershipUnitsOption)
        .click(this.llcFields.membershipUnitsOption)
        .hover(this.llcFields.numberOfUnits)
        .typeText(this.llcFields.numberOfUnits, llc.numberOfUnits, {
          replace: true,
        });
    } else if (llc.percentageAmount) {
      await t
        .hover(this.llcFields.membershipPercentageOption)
        .click(this.llcFields.membershipPercentageOption)
        .hover(this.llcFields.percentageAmount)
        .typeText(this.llcFields.percentageAmount, llc.percentageAmount, {
          replace: true,
        });
    }

    await t
      .click(this.addHoldingButton)
      .click(main_navigation_bar_section_model.viewButtonOnFlashMessage);
  }

  async inputBasicDetailsOnForm(type, data) {
    if (type == "warrant") {
      await t.typeText(this.warrantName, data.warrantName, {
        replace: true,
      });
    }
    if (type == "option") {
      await t.typeText(this.optionName, data.optionName, {
        replace: true,
      });
    }
    await t
      .typeText(this.holdingFields.acquisitionCost, data.acquisitionCost, {
        replace: true,
      })
      .typeText(this.holdingFields.acquisitionDate, data.acquisitionDate, {
        replace: true,
      })
      .hover(this.holdingFields.quantity)
      .typeText(this.holdingFields.quantity, data.quantity, {
        replace: true,
      })
      .click(this.addHoldingButton)
      .click(main_navigation_bar_section_model.viewButtonOnFlashMessage);
  }
}