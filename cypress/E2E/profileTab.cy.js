import { profileTabTest } from '../page_objects/profileUpdatePage';
import { Faker, faker } from '@faker-js/faker';


describe('Profile Tab', () => {
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
        randomAdress: faker.address.streetAddress(),
        randomTelNo: faker.phone.number(),
        randomSkype: faker.internet.userName(),
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
        cy.visit('/');
        cy.loginViaBE();
        cy.visit('/organizations/6552/team');
        cy.url().should('include', '/team');
        profileTabTest.okayBtn.click();
        profileTabTest.memberInfo.click();
    })

    it ('Change or add phone number', () => {
        profileTabTest.contactPhone.invoke('val','').type(userData.phoneNumber).blur();
        profileTabTest.phoneUpdateBtn.then(el => {
            if (el.length > 0) {
                cy.wrap(el).then($el => {
                    expect($el).to.exist;
                    el.click()
                })
            }
        })
     })

     it ('Total working hours per week change', () => {
        profileTabTest.workingHours.invoke('val','').type(userData.hoursPerWeek);
        profileTabTest.phoneUpdateBtn.then(el => {
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
            url: '/api/v2/organizations/6552/roles'
        }).as('AddingRole');
        profileTabTest.rolesBtn.click();
        profileTabTest.roleInput.type(userData.randomJob);
        profileTabTest.confirmRoleBtn.click({force: true});
        cy.wait('@AddingRole').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
     })

     it ('Add 2nd Email', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile'
        }).as('Adding2ndEmail');
        profileTabTest.addEventBtn.should('be.visible');
        profileTabTest.addEventBtn.click();
        profileTabTest.eventDropdownBtn.click();
        profileTabTest.singleEventDropdown.find('a').contains('2nd email').click({force:true});
        profileTabTest.eventContentInput.click().type(userData.randomEmail);
        profileTabTest.confirmNewEventBtn.should('be.visible');
        profileTabTest.confirmNewEventBtn.click();
        cy.wait('@Adding2ndEmail').then(interception => {
            eventId = interception.response.body.id;
            expect(interception.response.statusCode).eq(201)
        });
        cy.get('.vs-u-display--block').last().should('contain', userData.randomEmail)
    })

    it ('Add Address', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile'
        }).as('AddingAddress');
        profileTabTest.addEventBtn.click();
        profileTabTest.eventDropdownBtn.click();
        profileTabTest.singleEventDropdown.find('a').contains('Address').click({force:true});
        profileTabTest.eventContentInput.click().type(userData.randomAdress);
        profileTabTest.confirmNewEventBtn.should('be.visible');
        profileTabTest.confirmNewEventBtn.click();
        cy.wait('@AddingAddress').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        cy.get('.vs-u-display--block').last().should('contain', userData.randomAdress)
    })

    it ('Add Telephone number', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile'
        }).as('AddingTelephone');
        profileTabTest.addEventBtn.click();
        profileTabTest.eventDropdownBtn.click();
        profileTabTest.singleEventDropdown.find('a').contains('Phone number').click({force:true});
        profileTabTest.eventContentInput.click().type(userData.randomTelNo);
        profileTabTest.confirmNewEventBtn.should('be.visible');
        profileTabTest.confirmNewEventBtn.click();
        cy.wait('@AddingTelephone').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        cy.get('.vs-u-display--block').last().should('contain', userData.randomTelNo)
    })

    it ('Add Skype', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile'
        }).as('AddingSkype');
        profileTabTest.addEventBtn.click();
        profileTabTest.eventDropdownBtn.click();
        profileTabTest.singleEventDropdown.find('a').contains('Skype').click({force:true});
        profileTabTest.eventContentInput.click().type(userData.randomSkype);
        profileTabTest.confirmNewEventBtn.should('be.visible');
        profileTabTest.confirmNewEventBtn.click();
        cy.wait('@AddingSkype').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        cy.get('.vs-u-display--block').last().should('contain', userData.randomSkype)
    })

    it ('Add LinkedIn', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile'
        }).as('AddingLinkedIn');
        profileTabTest.addEventBtn.click();
        profileTabTest.eventDropdownBtn.click();
        profileTabTest.singleEventDropdown.find('a').contains('Linkedin').click({force:true});
        profileTabTest.eventContentInput.click().type('www.linkedin.com/' + userData.randomSkype);
        profileTabTest.confirmNewEventBtn.should('be.visible');
        profileTabTest.confirmNewEventBtn.click();
        cy.wait('@AddingLinkedIn').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        cy.get('.vs-u-display--block').last().should('contain', 'www.linkedin.com/' + userData.randomSkype);
    })

    it ('Add Twitter', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile'
        }).as('AddingTwitter');
        profileTabTest.addEventBtn.click();
        profileTabTest.eventDropdownBtn.click();
        profileTabTest.singleEventDropdown.find('a').contains('Twitter').click({force:true});
        profileTabTest.eventContentInput.click().type(userData.randomSkype + '1');
        profileTabTest.confirmNewEventBtn.should('be.visible');
        profileTabTest.confirmNewEventBtn.click();
        cy.wait('@AddingTwitter').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        cy.get('.vs-u-display--block').last().should('contain', userData.randomSkype + '1')
    })

    it ('Add Birthday', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile'
        }).as('AddingBirthday');
        profileTabTest.addEventBtn.click();
        profileTabTest.eventDropdownBtn.click();
        profileTabTest.singleEventDropdown.find('a').contains('Birthday').click({force:true});
        profileTabTest.eventContentInput.click().type(userData.randomBirthdayDay + ' Jul ' + userData.randomBirtdayYear).type('{enter}');
        profileTabTest.confirmNewEventBtn.should('be.visible');
        profileTabTest.confirmNewEventBtn.click();
        cy.wait('@AddingBirthday').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        profileTabTest.addNewEventSection.last().should('contain', 'Birthday');
    })

    it ('Add Marital Status', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile'
        }).as('AddingMaritalStatus');
        profileTabTest.addEventBtn.click();
        profileTabTest.eventDropdownBtn.click();
        profileTabTest.singleEventDropdown.find('a').contains('Marital status').click({force:true});
        profileTabTest.eventContentInput.click().type('Divorced');
        profileTabTest.confirmNewEventBtn.should('be.visible');
        profileTabTest.confirmNewEventBtn.click();
        cy.wait('@AddingMaritalStatus').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        cy.get('.vs-u-display--block').last().should('contain', 'Divorced')
    })

    it ('Add Family', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile'
        }).as('AddingFamily');
        profileTabTest.addEventBtn.click();
        profileTabTest.eventDropdownBtn.click();
        profileTabTest.singleEventDropdown.find('a').contains('Family').click({force:true});
        profileTabTest.eventContentInput.click().type('None');
        profileTabTest.confirmNewEventBtn.should('be.visible');
        profileTabTest.confirmNewEventBtn.click();
        cy.wait('@AddingFamily').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        cy.get('.vs-u-display--block').last().should('contain', 'None')
    })

    it ('Add Other', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile'
        }).as('AddingOther');
        profileTabTest.addEventBtn.click();
        profileTabTest.eventDropdownBtn.click();
        profileTabTest.singleEventDropdown.find('a').contains('Other').click({force:true});
        profileTabTest.otherInput.click().type(userData.randomJobArea);
        profileTabTest.eventContentInput.click().type(userData.randomJobDescriptor);
        profileTabTest.confirmNewEventBtn.should('be.visible');
        profileTabTest.confirmNewEventBtn.click();
        cy.wait('@AddingOther').then(interception => {
            expect(interception.response.statusCode).eq(201)
        });
        cy.get('.vs-u-display--block').last().should('contain', userData.randomJobDescriptor)
    })

    it ('Delete single event', () => {
        cy.intercept({
            method: 'DELETE',
            url: `https://api.vivifyscrum-stage.com/api/v2/organizations/6552/members/93961/profile/${eventId}`
        }).as('DeletingEvent');
        profileTabTest.deleteBtn.click({force:true});
        profileTabTest.yesBtnDelModal.click();
        cy.wait('@DeletingEvent').then(interception => {
            expect(interception.response.statusCode).eq(200)
        });
    })

    it ('Cancel delete single event', () => {
        profileTabTest.deleteBtn.click({force:true});
        profileTabTest.noBtnDelModal.click()
    })
})
