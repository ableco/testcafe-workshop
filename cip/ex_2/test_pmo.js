import { Selector } from "testcafe";

export default class TestPOM {
    constructor() {
        this.signUpButton = Selector("a").withExactText("Sign Up");
        this.firstNameInput = Selector("#TextInput-firstName");
        this.lastNameInput = Selector("#TextInput-lastName");
        this.emailNameInput = Selector("#TextInput-email");
        this.passwordInput = Selector("#TextInput-password");
        this.getStartedButton = Selector("button").withExactText("Get Started!");
        this.zipCodeInput = Selector("#TextInput-zipCode");
        this.highSchoolNameInput = Selector("#TextInput-highSchoolName");
        this.graduationYearDropdown = Selector("#Dropdown-expectedGraduationYear");
        this.graduationYearFirstItem = Selector("#Dropdown-expectedGraduationYear").parent(0).find("li").nth(0);
        this.nextButton = Selector("button").withExactText("Next: Your Scores");
        this.addMyScoresLaterLink = Selector("button").withExactText("I'll add my scores later");
        this.doThisLaterLink = Selector("button").withExactText("I'll do this later");
        this.profileHeader = Selector("div").withAttribute("class", /ProfileHeader__name/);
    }
}