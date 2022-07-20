class ProfileTabTest {
    get vsModal() {
        return cy.get('.vs-c-modal')
    }

    get contactSection() {
        return cy.get('.vs-c-form-group__body').last()
    }

    get rolesSection() {
        return cy.get('.vs-c-modal-labels-wrapper')
    }

    get newLabelsSection() {
        return cy.get('.add-new-label-controls')
    }

    get newEventSection() {
        return cy.get('.vs-c-timeline__add-activity')
    }

    get eventDropdownSection() {
        return cy.get('.el-dropdown-menu')
    }

    get addNewEventSection() {
        return cy.get('.vs-c-timeline__activity')
    }

    get dateArrowsSections() {
        return cy.get('.el-date-picker__header')
    }

    get deleteEventSection() {
        return cy.get('.vs-c-timeline__activity-edit')
    }

    get okayBtn() {
        return this.vsModal.find('button').eq(1)
    }

    get memberInfo() {
        return cy.get('.vs-c-table-icon-lighten').eq(1)
    }

    get contactPhone() {
        return cy.get('input[type="tel"]')
    }

    get phoneUpdateBtn() {
        return this.contactSection.find('button').last()
    }

    get workingHours() {
        return cy.get('.vs-c-mt-input').last()
    }

    get rolesBtn() {
        return this.rolesSection.find('button')
    }
    
    get roleInput() {
        return cy.get('.el-input__inner')
    }

    get confirmRoleBtn() {
        return this.newLabelsSection.find('button').eq(1)
    }

    get addEventBtn() {
        return this.newEventSection.find('.vs-c-timeline__icon')
    }

    get eventDropdownBtn() {
        return cy.get('.el-icon-caret-bottom').eq(2)
    }

    get singleEventDropdown() {
        return this.eventDropdownSection.find('.el-dropdown-menu__item')
    }

    get eventContentInput() {
        return cy.get('.vs-c-mt-input').last()
    }

    get confirmNewEventBtn() {
        return this.addNewEventSection.find('button').eq(1)
    }

    get leftArrowDate() {
        return this.dateArrowsSections.find('button').eq(0)
    }

    get otherInput() {
        return cy.get('.vs-c-mt-input').eq(5)
    }

    get deleteBtn() {
        return cy.get('button[class="el-button el-button--text el-button--large"]').eq(0)
    }

    get yesBtnDelModal() {
        return cy.get('button[name="save-btn')
    }

    get noBtnDelModal() {
        return cy.get('button[name="cancel-btn')
    } 
}

export const profileTabTest = new ProfileTabTest
