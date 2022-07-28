import { teamMembersProfileTab } from '../page_objects/teamMembersProfileUpdatePage';
import { Faker, faker } from '@faker-js/faker';


describe('Team members Profile Tab', () => {
    let eventId;
    let userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: faker.phone.imei(),
        hoursPerWeek: faker.datatype.number({
            'min': 40,
            'max': 168
        }),
        randomJob: faker.name.jobTitle(),
        randomEmail: faker.internet.email(),
        randomAddress: faker.address.streetAddress(),
        randomTelNo: faker.phone.number(),
        randomSkype: faker.internet.userName(),
        randomTwitter: faker.internet.userName() + faker.random.numeric(1),
        randomMonth: faker.date.month().substring(0, 3),
        randomBirthdayDay: faker.datatype.number({
            'min': 1,
            'max': 31
        }),
        randomBirtdayYear: faker.datatype.number({
            'min': 1945,
            'max': 2002
        }),
        randomJobArea: faker.name.jobArea(),
        randomJobDescriptor: faker.name.jobDescriptor()
    };
    let events = {
        secondEmail: "2nd email",
        address: "Address",
        phoneNumber: "Phone number",
        skype: "Skype",
        linkedin: "Linkedin",
        twitter: "Twitter",
        birthday: "Birthday",
        maritalStatus: "Marital status",
        family: "Family",
        other: "Other"
    }

    before('Be logged in', () => {
        cy.loginViaBE();
        cy.visit('/organizations/6552/team');
        cy.url().should('include', '/team');
        teamMembersProfileTab.okBtn.click();
        teamMembersProfileTab.memberInfo.click();
    })

    it ('Change or add phone number', () => {
        teamMembersProfileTab.contactPhone.invoke('val','').type(userData.phoneNumber).blur();
        teamMembersProfileTab.phoneUpdateBtn.then(el => {
            if (el.length > 0) {
                cy.wrap(el).then($el => {
                    expect($el).to.exist;
                    el.click()
                })
            }
        })
     })

     it ('Total working hours per week change', () => {
        teamMembersProfileTab.workingHours.invoke('val','').type(userData.hoursPerWeek);
        teamMembersProfileTab.phoneUpdateBtn.then(el => {
            if (el.length > 0) {
                cy.wrap(el).then($el => {
                    expect($el).to.exist;
                    el.click()
                })
            }
        })
     })

     it ('Adding role to a member', () => {
        cy.intercept({
            method: 'POST',
            url: '/api/v2/organizations/*/roles'
        }).as('addingRole');
        teamMembersProfileTab.rolesBtn.click();
        teamMembersProfileTab.roleInput.type(userData.randomJob);
        teamMembersProfileTab.confirmRoleBtn.click({force: true});
        cy.wait('@addingRole').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
     })

     it ('Add 2nd Email', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('adding2ndEmail');
        teamMembersProfileTab.addEventBtn.should('be.visible');
        teamMembersProfileTab.addEventFunction(events.secondEmail);
        teamMembersProfileTab.eventContentInput.click().type(userData.randomEmail);
        teamMembersProfileTab.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTab.confirmNewEventBtn.click();
        cy.wait('@adding2ndEmail').then(interception => {
            eventId = interception.response.body.id;
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTab.addedEvent.last().should('contain', userData.randomEmail)
    })

    it ('Add Address', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingAddress');
        teamMembersProfileTab.addEventFunction(events.address);
        teamMembersProfileTab.eventContentInput.click().type(userData.randomAddress);
        teamMembersProfileTab.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTab.confirmNewEventBtn.click();
        cy.wait('@addingAddress').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTab.addedEvent.last().should('contain', userData.randomAddress)
    })

    it ('Add Telephone number', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingTelephone');
        teamMembersProfileTab.addEventFunction(events.phoneNumber);
        teamMembersProfileTab.eventContentInput.click().type(userData.randomTelNo);
        teamMembersProfileTab.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTab.confirmNewEventBtn.click();
        cy.wait('@addingTelephone').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTab.addedEvent.last().should('contain', userData.randomTelNo)
    })

    it ('Add Skype', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingSkype');
        teamMembersProfileTab.addEventFunction(events.skype);
        teamMembersProfileTab.eventContentInput.click().type(userData.randomSkype);
        teamMembersProfileTab.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTab.confirmNewEventBtn.click();
        cy.wait('@addingSkype').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTab.addedEvent.last().should('contain', userData.randomSkype)
    })

    it ('Add LinkedIn', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingLinkedIn');
        teamMembersProfileTab.addEventFunction(events.linkedin);
        teamMembersProfileTab.eventContentInput.click().type('www.linkedin.com/' + userData.randomSkype);
        teamMembersProfileTab.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTab.confirmNewEventBtn.click();
        cy.wait('@addingLinkedIn').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTab.addedEvent.last().should('contain', 'www.linkedin.com/' + userData.randomSkype);
    })

    it ('Add Twitter', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingTwitter');
        teamMembersProfileTab.addEventFunction(events.twitter);
        teamMembersProfileTab.eventContentInput.click().type(userData.randomTwitter);
        teamMembersProfileTab.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTab.confirmNewEventBtn.click();
        cy.wait('@addingTwitter').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTab.addedEvent.last().should('contain', userData.randomTwitter)
    })

    it ('Add Birthday', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingBirthday');
        teamMembersProfileTab.addEventFunction(events.birthday);
        teamMembersProfileTab.eventContentInput.click().type(userData.randomBirthdayDay + ' ' + userData.randomMonth + ' ' + userData.randomBirtdayYear).type('{enter}');
        teamMembersProfileTab.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTab.confirmNewEventBtn.click();
        cy.wait('@addingBirthday').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTab.addNewEventSection.last().should('contain', 'Birthday');
    })

    it ('Add Marital Status', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingMaritalStatus');
        teamMembersProfileTab.addEventFunction(events.maritalStatus);
        teamMembersProfileTab.eventContentInput.click().type('Divorced');
        teamMembersProfileTab.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTab.confirmNewEventBtn.click();
        cy.wait('@addingMaritalStatus').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTab.addedEvent.last().should('contain', 'Divorced')
    })

    it ('Add Family', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingFamily');
        teamMembersProfileTab.addEventFunction(events.family);
        teamMembersProfileTab.eventContentInput.click().type('None');
        teamMembersProfileTab.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTab.confirmNewEventBtn.click();
        cy.wait('@addingFamily').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTab.addedEvent.last().should('contain', 'None')
    })

    it ('Add Other', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingOther');
        teamMembersProfileTab.addEventFunction(events.other);
        teamMembersProfileTab.otherInput.click().type(userData.randomJobArea);
        teamMembersProfileTab.eventContentInput.click().type(userData.randomJobDescriptor);
        teamMembersProfileTab.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTab.confirmNewEventBtn.click();
        cy.wait('@addingOther').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTab.addedEvent.last().should('contain', userData.randomJobDescriptor)
    })

    it ('Delete single event', () => {
        cy.intercept({
            method: 'DELETE',
            url: `https://api.vivifyscrum-stage.com/api/v2/organizations/*/members/*/profile/${eventId}`
        }).as('deletingEvent');
        teamMembersProfileTab.deleteModalUl.should('contain', 'li')
        teamMembersProfileTab.deleteEventFunction();
        teamMembersProfileTab.deleteBtn.click({force:true})
        teamMembersProfileTab.yesBtnDelModal.click();
        cy.wait('@deletingEvent').then(interception => {
            expect(interception.response.statusCode).eq(200)
        });
    })

    it ('Cancel delete single event', () => {
        teamMembersProfileTab.deleteBtn.click({force:true});
        teamMembersProfileTab.noBtnDelModal.click()
    })
})
