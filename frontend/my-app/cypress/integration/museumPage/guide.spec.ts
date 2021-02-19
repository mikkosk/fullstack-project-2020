describe("museumPage", function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
    })

    afterEach(function() {
        cy.logout()
    })

    describe("guide", function() {
        beforeEach(function() {
            cy.login("GuideOne", "GuideOne");
            cy.visit('http://localhost:3001/find/museums')
            cy.get('button:first').click()
        })

        it("can send a request", function() {
            cy.contains("Oletko tämän museon henkilökuntaa?")
            cy.get('button:last').click()
            cy.get('button:last').should("be.disabled")
            cy.contains("Olet jo lähettänyt pyynnön")
        })
    })
})