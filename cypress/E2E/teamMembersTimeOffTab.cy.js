import { teamMembersProfileTab } from "../page_objects/teamMembersProfileUpdatePage";
import { teamMembersTimeOffTab } from "../page_objects/teamMembersTimeOffPage";
import { userData } from "../fixtures/userData"

describe('Time off tab', () =>{
    let eventName;
    let events = [
        {eventName: "Parental leave"},
        {eventName: "Vacation"},
        {eventName: "Sick leave"},
        {eventName: "Paid time off"},
        {eventName: "Unpaid time off"},
        {eventName: "Other"}
    ]

    

    before ('Be logged in', () => {
        cy.loginViaBE();
        cy.visit('/organizations/6552/team');
        cy.url().should('include', '/team');
        teamMembersProfileTab.okBtn.should('be.visible').click();
        teamMembersProfileTab.memberInfo.click();
        teamMembersTimeOffTab.timeOffTabBtn.click();
    })

    xit ('Change joining date', () => {
        cy.intercept({
            method: 'PUT',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*'
        }).as('changingDate');
        teamMembersTimeOffTab.joiningDateInput.click().clear();
        teamMembersTimeOffTab.joiningDateInput.click().type(userData.randomDate).type('{enter}');
        teamMembersTimeOffTab.updateDateBtn.click();
        cy.wait('@changingDate')
        teamMembersTimeOffTab.updateDateBtn.should('not.be.visible');
        teamMembersProfileTab.memberInfo.click();
        teamMembersTimeOffTab.timeOffTabBtn.click();
        teamMembersTimeOffTab.joiningDateInput.click().invoke('val').should('contain', userData.randomDate)
    })

    xit ('Change number of vacation days', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/vacation-days-event'
        }).as('changingFreeDaysNum')
        teamMembersTimeOffTab.vacationDaysInput.click().clear().type(userData.randomVacationDay);
        teamMembersTimeOffTab.updateFreeDaysBtn.click();
        teamMembersTimeOffTab.updateJoiningDateBtnWhenUpdateFreeDays.should('not.be.visible');
        cy.wait('@changingFreeDaysNum').then(interception =>{
            expect(interception.response.statusCode).eq(200)
        });
        teamMembersTimeOffTab.vacationDaysValue.should('contain', userData.randomVacationDay)
    })

    it ('Add Parental leave event', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/timeoff-activities'
        }).as('addingParentalLeaveEvent')
        teamMembersTimeOffTab.addEventFunction('Parental leave', teamMembersTimeOffTab.getIndex(events, eventName, 'Parental leave'))
        cy.wait('@addingParentalLeaveEvent').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
    })

    it ('Add Vacation event', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/timeoff-activities'
        }).as('addingVacationEvent')
        teamMembersProfileTab.addEventBtn.should('be.visible');
        teamMembersTimeOffTab.addEventFunction('Vacation', teamMembersTimeOffTab.getIndex2(events, eventName, 'Vacation' + 1))
        cy.wait('@addingVacationEvent').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
    })

    it ('Add Sick leave event', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/timeoff-activities'
        }).as('addingSickLeaveEvent')
        teamMembersProfileTab.addEventBtn.should('be.visible');
        teamMembersTimeOffTab.addEventFunction('Sick leave', teamMembersTimeOffTab.getIndex3(events, eventName, 'Sick leave' + 2))
        cy.wait('@addingSickLeaveEvent').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
    })

    it ('Add Paid time off event', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/timeoff-activities'
        }).as('addingPaidTimeOffEvent')
        teamMembersProfileTab.addEventBtn.should('be.visible');
        teamMembersTimeOffTab.addEventFunction('Paid time off', teamMembersTimeOffTab.getIndex4(events, eventName, 'Paid time off' + 3))
        cy.wait('@addingPaidTimeOffEvent').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
    })

    it ('Add Unpaid time off event', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/timeoff-activities'
        }).as('addingUnpaidTimeOffEvent')
        teamMembersTimeOffTab.addEventFunctionInitialSteps();
        teamMembersTimeOffTab.dropdownTimeOff.contains('Unpaid time off').click({force:true});
        teamMembersTimeOffTab.datePickBtn.click();
        teamMembersTimeOffTab.singleTrFromRightTable.eq(1).find('td').eq(userData.randomDatePickFirstHalf).click();
        teamMembersTimeOffTab.singleTrFromRightTable.eq(1).find('td').eq(userData.randomDatePickSecondHalf).click();
        teamMembersTimeOffTab.confirmNewEventBtn.should('exist').click();
        cy.wait('@addingUnpaidTimeOffEvent').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
    })

    it ('Add Other event', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/timeoff-activities'
        }).as('addingOtherEvent')
        teamMembersTimeOffTab.addEventFunctionInitialSteps();
        teamMembersTimeOffTab.dropdownTimeOff.contains('Other').click({force:true});
        teamMembersTimeOffTab.otherEventInputField.type(userData.randomText)
        teamMembersTimeOffTab.datePickBtn.eq(1).click();
        teamMembersTimeOffTab.singleTrFromRightTable.eq(2).find('td').eq(userData.randomDatePickFirstHalf).click();
        teamMembersTimeOffTab.singleTrFromRightTable.eq(2).find('td').eq(userData.randomDatePickSecondHalf).click();
        teamMembersTimeOffTab.confirmNewEventBtn.click();
        cy.wait('@addingOtherEvent').then(interception => {
            expect(interception.response.statusCode).eq(200);
        })
    })

    it ('Delete single event', () => {
        cy.intercept({
            method: 'DELETE',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/timeoff-activities/*'
        }).as('deletingEvent');
        teamMembersTimeOffTab.deleteModalLi.should('be.visible')
        teamMembersTimeOffTab.deleteBtn.click({force:true})
        teamMembersProfileTab.yesBtnDelModal.click();
        cy.wait('@deletingEvent').then(interception => {
            expect(interception.response.statusCode).eq(200)
        });
    })

    it ('Cancel delete single event', () => {
        teamMembersTimeOffTab.deleteBtn.click({force:true});
        teamMembersProfileTab.noBtnDelModal.click()
    })

    it ('Edit single event', () => {
        cy.intercept({
            method: 'PUT',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/timeoff-activities/*'
        }).as('editingEvent');
        teamMembersTimeOffTab.editBtn.should('exist').click({force:true});
        teamMembersTimeOffTab.editItemDatePickInput.should('be.visible').click();
        teamMembersTimeOffTab.singleTrFromRightTable.eq(2).find('td').eq(userData.randomDatePickFirstHalf).click();
        teamMembersTimeOffTab.singleTrFromRightTable.eq(2).find('td').eq(userData.randomDatePickSecondHalf).click();
        teamMembersTimeOffTab.editEventDropdownBtn.click();
        teamMembersTimeOffTab.dropdownTimeOff.contains('Parental leave').click({force:true});
        teamMembersTimeOffTab.updateEventBtn.should('be.visible').click();
        cy.wait('@editingEvent')
    })
})
