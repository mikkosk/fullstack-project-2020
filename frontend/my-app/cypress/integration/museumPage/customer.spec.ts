describe("museumPage", function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
    })

    afterEach(function() {
        cy.logout()
    })

    describe("customer", function() {
        beforeEach(function() {
            cy.login("CustomerTwo", "CustomerTwo");
            cy.visit('http://localhost:3000/find/museums')
            cy.get('button:last').click()
        })

        it("shows all titles", function() {
            cy.contains("Aukiolo:")
            cy.contains("Opastukset")
        })

        it("can go to tour page", function() {
            cy.get('#extraInfo b:last').click()
            cy.url().should('contain', 'tour')
        })
    })
})