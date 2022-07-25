import { teamMembersProfileTabTest } from '../page_objects/teamMembersProfileUpdatePage';
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
        randomTwitter: faker.internet.userName() + '1',
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
    }
    before('Be logged in', () => {
        cy.loginViaBE();
        cy.visit('/organizations/6552/team');
        cy.url().should('include', '/team');
        teamMembersProfileTabTest.okBtn.click();
        teamMembersProfileTabTest.memberInfo.click();
    })

    it ('Change or add phone number', () => {
        teamMembersProfileTabTest.contactPhone.invoke('val','').type(userData.phoneNumber).blur();
        teamMembersProfileTabTest.phoneUpdateBtn.then(el => {
            if (el.length > 0) {
                cy.wrap(el).then($el => {
                    expect($el).to.exist;
                    el.click()
                })
            }
        })
     })

     it ('Total working hours per week change', () => {
        teamMembersProfileTabTest.workingHours.invoke('val','').type(userData.hoursPerWeek);
        teamMembersProfileTabTest.phoneUpdateBtn.then(el => {
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
        teamMembersProfileTabTest.rolesBtn.click();
        teamMembersProfileTabTest.roleInput.type(userData.randomJob);
        teamMembersProfileTabTest.confirmRoleBtn.click({force: true});
        cy.wait('@addingRole').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
     })

     it ('Add 2nd Email', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('adding2ndEmail');
        teamMembersProfileTabTest.addEventBtn.should('be.visible');
        teamMembersProfileTabTest.addEventFunction('2nd email');
        teamMembersProfileTabTest.eventContentInput.click().type(userData.randomEmail);
        teamMembersProfileTabTest.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTabTest.confirmNewEventBtn.click();
        cy.wait('@adding2ndEmail').then(interception => {
            eventId = interception.response.body.id;
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTabTest.addedEvent.last().should('contain', userData.randomEmail)
    })

    it ('Add Address', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingAddress');
        teamMembersProfileTabTest.addEventFunction('Address');
        teamMembersProfileTabTest.eventContentInput.click().type(userData.randomAddress);
        teamMembersProfileTabTest.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTabTest.confirmNewEventBtn.click();
        cy.wait('@addingAddress').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTabTest.addedEvent.last().should('contain', userData.randomAddress)
    })

    it ('Add Telephone number', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingTelephone');
        teamMembersProfileTabTest.addEventFunction('Phone number');
        teamMembersProfileTabTest.eventContentInput.click().type(userData.randomTelNo);
        teamMembersProfileTabTest.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTabTest.confirmNewEventBtn.click();
        cy.wait('@addingTelephone').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTabTest.addedEvent.last().should('contain', userData.randomTelNo)
    })

    it ('Add Skype', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingSkype');
        teamMembersProfileTabTest.addEventFunction('Skype');
        teamMembersProfileTabTest.eventContentInput.click().type(userData.randomSkype);
        teamMembersProfileTabTest.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTabTest.confirmNewEventBtn.click();
        cy.wait('@addingSkype').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTabTest.addedEvent.last().should('contain', userData.randomSkype)
    })

    it ('Add LinkedIn', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingLinkedIn');
        teamMembersProfileTabTest.addEventFunction('Linkedin');
        teamMembersProfileTabTest.eventContentInput.click().type('www.linkedin.com/' + userData.randomTwitter);
        teamMembersProfileTabTest.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTabTest.confirmNewEventBtn.click();
        cy.wait('@addingLinkedIn').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTabTest.addedEvent.last().should('contain', 'www.linkedin.com/' + userData.randomTwitter);
    })

    it ('Add Twitter', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingTwitter');
        teamMembersProfileTabTest.addEventFunction('Twitter');
        teamMembersProfileTabTest.eventContentInput.click().type(userData.randomSkype + '1');
        teamMembersProfileTabTest.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTabTest.confirmNewEventBtn.click();
        cy.wait('@addingTwitter').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTabTest.addedEvent.last().should('contain', userData.randomSkype + '1')
    })

    it ('Add Birthday', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingBirthday');
        teamMembersProfileTabTest.addEventFunction('Birthday');
        teamMembersProfileTabTest.eventContentInput.click().type(userData.randomBirthdayDay + ' ' + userData.randomMonth + ' ' + userData.randomBirtdayYear).type('{enter}');
        teamMembersProfileTabTest.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTabTest.confirmNewEventBtn.click();
        cy.wait('@addingBirthday').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTabTest.addNewEventSection.last().should('contain', 'Birthday');
    })

    it ('Add Marital Status', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingMaritalStatus');
        teamMembersProfileTabTest.addEventFunction('Marital status');
        teamMembersProfileTabTest.eventContentInput.click().type('Divorced');
        teamMembersProfileTabTest.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTabTest.confirmNewEventBtn.click();
        cy.wait('@addingMaritalStatus').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTabTest.addedEvent.last().should('contain', 'Divorced')
    })

    it ('Add Family', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingFamily');
        teamMembersProfileTabTest.addEventFunction('Family');
        teamMembersProfileTabTest.eventContentInput.click().type('None');
        teamMembersProfileTabTest.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTabTest.confirmNewEventBtn.click();
        cy.wait('@addingFamily').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTabTest.addedEvent.last().should('contain', 'None')
    })

    it ('Add Other', () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.config('baseAPI') + '/organizations/*/members/*/profile'
        }).as('addingOther');
        teamMembersProfileTabTest.addEventFunction('Other');
        teamMembersProfileTabTest.otherInput.click().type(userData.randomJobArea);
        teamMembersProfileTabTest.eventContentInput.click().type(userData.randomJobDescriptor);
        teamMembersProfileTabTest.confirmNewEventBtn.should('be.visible');
        teamMembersProfileTabTest.confirmNewEventBtn.click();
        cy.wait('@addingOther').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        teamMembersProfileTabTest.addedEvent.last().should('contain', userData.randomJobDescriptor)
    })

    it ('Delete single event', () => {
        cy.intercept({
            method: 'DELETE',
            url: `https://api.vivifyscrum-stage.com/api/v2/organizations/*/members/*/profile/${eventId}`
        }).as('deletingEvent');
        teamMembersProfileTabTest.deleteModalUl.should('contain', 'li')
        teamMembersProfileTabTest.deleteEventFunction();
        teamMembersProfileTabTest.deleteBtn.click({force:true})
        teamMembersProfileTabTest.yesBtnDelModal.click();
        cy.wait('@deletingEvent').then(interception => {
            expect(interception.response.statusCode).eq(200)
        });
    })

    it ('Cancel delete single event', () => {
        teamMembersProfileTabTest.deleteBtn.click({force:true});
        teamMembersProfileTabTest.noBtnDelModal.click()
    })
})
