describe ('LoginViaBackend', () => {
    it ('Be logged in', () => {
        cy.visit('/');
        cy.loginViaBE();
        cy.visit('/my-organizations');
    })
})
