import{teamMembersProfileTab} from "../page_objects/teamMembersProfileUpdatePage";
import { userData } from '../fixtures/userData';

class TeamMembersTimeOffTab {
    get tabModal() {
        return cy.get('.el-tabs__nav-scroll').eq(1)
    }

    get updateDateModal() {
        return cy.get('.vs-c-free-days-form-group')
    }

    get dropdownTimeOffModal() {
        return cy.get('ul[class="el-dropdown-menu vs-c-dropdown-plus-icon"]')
    }

    get addNewEventModal() {
        return cy.get('li[class="vs-c-timeline__add-activity"]')
    }

    get dateTableModalLeft() {
        return cy.get('.el-date-table').eq(1)
    }

    get dateTableModalRight() {
        return cy.get('.el-date-table').eq(2)
    }

    get timeOffTabBtn() {
        return this.tabModal.find('.el-tabs__item').eq(2)
    }

    get joiningDateInput() {
        return cy.get('.el-input__inner')
    }

    get updateDateBtn() {
        return this.updateDateModal.find('button').eq(1)
    }

    get vacationDaysInput() {
        return this.updateDateModal.find('input').eq(1)
    }

    get updateFreeDaysBtn() {
        return this.updateDateModal.eq(1).find('button').eq(1)
    }

    get updateJoiningDateBtnWhenUpdateFreeDays() {
        return this.updateDateModal.eq(0).find('button').eq(1)
    }

    get vacationDaysValue() {
        return cy.get('.c-vacation-days__value')
    }

    get dropdownTimeOff() {
        return this.dropdownTimeOffModal.find('li')
    }

    get confirmNewEventBtn() {
        return this.addNewEventModal.find('button').last()
    }

    get singleTrFromLeftTable() {
        return this.dateTableModalLeft.find('tr')
    }

    get singleTrFromRightTable() {
        return this.dateTableModalRight.find('tr')
    }

    get datePickBtn() {
        return this.addNewEventModal.find('input')
    }

    get otherEventInputField() {
        return this.addNewEventModal.find('input').eq(0)
    }

    get deleteModalNew() {
        return cy.get('.vs-c-modal')
    }

    get deleteModalParent() {
        return this.deleteModalNew.find('div[class="vs-c-timeline vs-c-section"]')
    }

    get deleteModalLi() {
        return this.deleteModalParent.find('li').then(el => {
            expect(el.length).to.be.greaterThan(1)
        })
    }

    get deleteBtn() {
        return this.deleteModalLi.should('exist').eq(1).find('button').last()
    }

    get editBtn() {
        return this.deleteModalLi.should('exist').eq(1).find('button').eq(0)
    }

    get editItemDatePickInput() {
        return this.deleteModalLi.eq(1).find('input')
    }

    get editEventDropdownBtn(){
        return this.deleteModalLi.eq(1).find('a')
    }

    get updateEventBtn() {
        return this.deleteModalLi.eq(1).find('button').last()
    }


    addEventFunction(additonalInfo, index) {
        teamMembersProfileTab.addEventBtn.eq(1).should('be.visible').click();
        teamMembersProfileTab.eventDropdownBtn.should('exist').click();
        this.dropdownTimeOff.contains(additonalInfo).click({force:true});
        this.datePickBtn.should('be.visible').click();
        this.singleTrFromLeftTable.eq(index).find('td').eq(userData.randomDatePickFirstHalf).click();
        this.singleTrFromLeftTable.eq(index).find('td').eq(userData.randomDatePickSecondHalf).click();
        this.confirmNewEventBtn.should('exist').click();
    }

    addEventFunctionInitialSteps() {
        teamMembersProfileTab.addEventBtn.should('be.visible');
        teamMembersProfileTab.addEventBtn.eq(1).click();
        teamMembersProfileTab.eventDropdownBtn.click();
    }

    getIndex(array, key, value) {
        return array.findIndex(obj => obj[key] === value) + 2;
    }

    getIndex2(array, key, value) {
        return array.findIndex(obj => obj[key] === value) + 3;
    }

    getIndex3(array, key, value) {
        return array.findIndex(obj => obj[key] === value) + 4;
    }

    getIndex4(array, key, value) {
        return array.findIndex(obj => obj[key] === value) + 5;
    }
}

export const teamMembersTimeOffTab = new TeamMembersTimeOffTab();
