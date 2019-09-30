import { Selector } from "testcafe";

export default class TestPOM {
    constructor() {
        this.teamMenu = Selector("a").withExactText("Team");
        this.teamMembers = Selector(".team__user");
        this.searchBox = Selector(".search__box");
        this.informationTab = Selector("a").withExactText("Information");
        this.memberEmail = Selector(".member li").nth(0).find("a");
        this.memberSlackUser = Selector(".member li").nth(1).find("p");
        this.memberLocation = Selector(".member li").nth(2).find("a");
        this.memberBirthDate = Selector(".member li").nth(3).find("p");
        this.memberJoinedDate = Selector(".member li").nth(4).find("p");
    }
}