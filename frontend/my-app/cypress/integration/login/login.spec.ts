describe('Login page', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
        Cypress.Commands.add('loginCustomer', ({username, password}) => {
            cy.request('POST', 'http:localhost:3001/api/login', {
                username, password
            }).then(({body}) => {
                localStorage.setItem("LoggedUser", JSON.stringify(body));
            })
        })
    })
    it('login opens correctly', function() {
        cy.visit('http://localhost:3000/login')
        cy.contains('Kirjaudu sisään tai luo käyttäjä')
        cy.get('input[name="username"]').should("have.length", 2)
        cy.get('input[name="password"]').should("have.length", 2)        
    })
    it('also sign up opens correctly', function() {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="languages.0"]').should("not.exist")
        cy.contains('Kirjaudu sisään tai luo käyttäjä')
        cy.get('select[name="type"]').select('Guide')
        cy.get('input[name="name"]')
        cy.get('input[name="languages.0"]')
    })
    it('sign up works correctly', function() {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="username"]:last').type("testi")
        cy.get('input[name="password"]:last').type("testi")
        cy.get('select[name="type"]').select('Guide')
        cy.get('input[name="name"]').type("testi")
        cy.get('input[name="languages.0"]').type("testi")
        cy.get('#registerationButton').click()
        cy.contains('testi lisätty')
    })

    it('sign up does nothing if form is not filled', function() {
        cy.visit('http://localhost:3000/login')
        cy.get('#registerationButton').click({force:true})
        cy.url().should('eq', 'http://localhost:3000/login')
    })

    
})