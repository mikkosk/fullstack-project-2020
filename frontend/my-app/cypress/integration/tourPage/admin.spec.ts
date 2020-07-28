describe("tourPage", function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
    })

    afterEach(function() {
        cy.logout()
    })

    describe("adminOwned", function() {
        beforeEach(function() {
            cy.login("AdminTwo", "AdminTwo");
            cy.visit('http://localhost:3000/find/museums')
            cy.get('button:last').click()
            cy.get("#tourList b:first").click()
        })

        it("can open modal for updating", function() {
            cy.get('button:first').click()
            cy.contains("Päivitä opastusta")
        })

        it("can close modal by clicking cancel", function() {
            cy.get('button:first').click()
            cy.get("#updateTourModal").contains("Päivitä opastusta")
            cy.get("#updateTourModal button:last").click()
            cy.get("#updateTourModal").should("not.exist")
        })

        it("submit button is disabled at start", function() {
            cy.get('button:first').click()
            cy.get("button[name='submit']").should("be.disabled")
        })

        it("modal closes after submit", function() {
            cy.get('button:first').click()
            cy.get('input[name="tourName"]').type("Päivitetty kierros")
            cy.get("button[name='submit']").click()
        })
    })
})