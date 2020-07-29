describe("tourPage", function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
    })

    afterEach(function() {
        cy.logout()
    })

    it("no button is shown if not logged in", function() {
        cy.visit('http://localhost:3000/find/museums')
        cy.get('button:last').click()
        cy.get('b:last').click()
        cy.get('button').should("not.exist")
    })

})