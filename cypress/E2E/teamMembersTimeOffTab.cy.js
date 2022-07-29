import { teamMembersProfileTab } from "../page_objects/teamMembersProfileUpdatePage";
import { teamMembersTimeOffTab } from "../page_objects/teamMembersTimeOffPage";
import { userData } from "../fixtures/userData"

describe('Time off tab', () =>{
    let events = {
        parentalLeave: "Parental leave",
        vacation: "Vacation",
        sickLeave: "Sick leave",
        paidTimeOff: "Paid time off",
        unpaidTimeOff: "Unpaid time off",
        other: "Other"
    }

    before('Be logged in', () => {
        cy.loginViaBE();
        cy.visit('/organizations/6552/team');
        cy.url().should('include', '/team');
        teamMembersProfileTab.okBtn.should('be.visible').click();
        teamMembersProfileTab.memberInfo.click();
        teamMembersTimeOffTab.timeOffTabBtn.click();
    })

    it ('Change joining date', () => {
        cy.intercept({
            method: 'PUT',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*'
        }).as('changingDate');
        teamMembersTimeOffTab.joiningDateInput.click().clear();
        teamMembersTimeOffTab.joiningDateInput.click().type(userData.randomDateDay + ' ' + userData.randomDateMonth + ' ' + userData.randomDateYear).type('{enter}');
        teamMembersTimeOffTab.updateDateBtn.click();
        cy.wait('@changingDate')
        teamMembersTimeOffTab.updateDateBtn.should('not.be.visible');
        teamMembersProfileTab.memberInfo.click();
        teamMembersTimeOffTab.timeOffTabBtn.click();
        teamMembersTimeOffTab.joiningDateInput.click().invoke('val').should('contain', userData.randomDateDay + ' ' + userData.randomDateMonth + ' ' + userData.randomDateYear)
    })

    it ('Change number of vacation days', () => {
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
        teamMembersTimeOffTab.addEventFunction(events.parentalLeave, 1)
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
        teamMembersTimeOffTab.addEventFunction(events.vacation, 2)
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
        teamMembersTimeOffTab.addEventFunction(events.sickLeave, 3)
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
        teamMembersTimeOffTab.addEventFunction(events.paidTimeOff, 4)
        cy.wait('@addingPaidTimeOffEvent').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
    })

    it ('Add Unpaid time off event', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/timeoff-activities'
        }).as('addingUnpaidTimeOffEvent')
        teamMembersProfileTab.addEventBtn.should('be.visible');
        teamMembersProfileTab.addEventBtn.eq(1).click();
        teamMembersProfileTab.eventDropdownBtn.click();
        teamMembersTimeOffTab.dropdownTimeOff.contains(events.unpaidTimeOff).click({force:true});
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
        teamMembersProfileTab.addEventBtn.should('be.visible');
        teamMembersProfileTab.addEventBtn.eq(1).click();
        teamMembersProfileTab.eventDropdownBtn.click();
        teamMembersTimeOffTab.dropdownTimeOff.contains(events.other).click({force:true});
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
        teamMembersTimeOffTab.deleteModalLi.should('exist')
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
        teamMembersTimeOffTab.dropdownTimeOff.contains(events.parentalLeave).click({force:true});
        teamMembersTimeOffTab.updateEventBtn.should('be.visible').click();
        cy.wait('@editingEvent')
    })
})

