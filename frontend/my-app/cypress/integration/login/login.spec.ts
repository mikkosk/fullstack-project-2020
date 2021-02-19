describe('Login page', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
    })
    it('login opens correctly', function() {
        cy.visit('http://localhost:3001/login')
        cy.contains('Kirjaudu sisään tai luo käyttäjä')
        cy.get('input[name="username"]').should("have.length", 2)
        cy.get('input[name="password"]').should("have.length", 2)        
    })
    it('also sign up opens correctly', function() {
        cy.visit('http://localhost:3001/login')
        cy.get('input[name="languages.0"]').should("not.exist")
        cy.contains('Kirjaudu sisään tai luo käyttäjä')
        cy.get('select[name="type"]').select('Guide')
        cy.get('input[name="name"]')
        cy.get('input[name="languages.0"]')
    })
    it('sign up works correctly', function() {
        cy.visit('http://localhost:3001/login')
        cy.get('input[name="username"]:last').type("testi")
        cy.get('input[name="password"]:last').type("testi")
        cy.get('select[name="type"]').select('Guide')
        cy.get('input[name="name"]').type("testi")
        cy.get('input[name="languages.0"]').type("testi")
        cy.get('#registerationButton').click()
        cy.contains('testi lisätty')
    })

    it('sign up does nothing if form is not filled', function() {
        cy.visit('http://localhost:3001/login')
        cy.get('#registerationButton').click({force:true})
        cy.url().should('eq', 'http://localhost:3001/login')
    })

    it('login works correctly', function() {
        cy.visit('http://localhost:3001/login')
        cy.contains('Kirjaudu sisään tai luo käyttäjä')
        cy.get('input[name="username"]:first').type("CustomerOne")
        cy.get('input[name="password"]:first').type("CustomerOne")     
        cy.get('#loginButton').click()
        cy.url().should('eq', 'http://localhost:3001/user')
    })

    it('error displayed with wrong credentials', function() {
        cy.visit('http://localhost:3001/login')
        cy.contains('Kirjaudu sisään tai luo käyttäjä')
        cy.get('input[name="username"]:first').type("Väärät")
        cy.get('input[name="password"]:first').type("Tiedot")     
        cy.get('#loginButton').click()
        cy.contains("Väärät tunnukset")
        cy.url().should('eq', 'http://localhost:3001/login')
    })
    
})