import { Selector } from "testcafe";

export default class TestPOM {
    constructor() {
        this.communityLink = Selector("a").withExactText("Community");
        this.joinToCommunityButton = Selector("a").withExactText("Join the Braver community").nth(0);
        this.emailInput = Selector("#email");
        this.birthDateInput = Selector("#birthDate");
        this.continueButton = Selector("button").withExactText("Continue");
        this.checkYourEmailTitle = Selector("h1").withExactText("Check your email");
    }
}