beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    cy.login("AdminTwo", "AdminTwo");
    cy.visit('http://localhost:3001/login')
})

afterEach(function() {
    cy.logout()
})

describe('bar', function() {

    it("can click find museums page", function() {
        cy.get("a").eq(0).click()
        cy.url().should('eq', 'http://localhost:3001/find/museums')
    })

    it("can click own page", function() {
        cy.get("a").eq(1).click()
        cy.url().should('eq', 'http://localhost:3001/user')
    })

    it("can click log out", function() {
        cy.get("a").eq(2).click()
        cy.url().should('eq', 'http://localhost:3001/login')
        cy.contains("Et ole kirjautunut sisään")
    })
})