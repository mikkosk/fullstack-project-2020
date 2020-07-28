describe("museumPage", function() {
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
        })

        it("shows all titles", function() {
            cy.contains("Nykyiset opastukset")
            cy.contains("Lisää opastus")
            cy.contains("Vahvistamattomat opastukset")
            cy.contains("Vahvistetut opastukset")
            cy.contains("Menneet opastukset")
            cy.contains("Käyttäjäpyynnöt")
        })

        it("can delete tour", function() {
            cy.get("#tourList button:first").click()
            cy.get("#tourList button").should("not.exist")
        })

        it("accepting request deletes it", function() {
            cy.get("div[name='requests'] i:first").click()
            cy.get("div[name='requests'] i").should("not.exist")
        })

        it("denying request deletes it", function() {
            cy.get("div[name='requests'] i:last").click()
            cy.get("div[name='requests'] i").should("not.exist")
        })

        it("tour can be added through form", function() {
            cy.get("#tourList button").should("have.length", 1)
            cy.get('input[name="tourName"]').type("Uusi kierros")
            cy.get('input[name="possibleLanguages.0"]').type("Kieli")
            cy.get('input[name="price"]').type("10")
            cy.get('input[name="lengthInMinutes"]').type("10")
            cy.get('input[name="maxNumberOfPeople"]').type("10")
            cy.get('input[name="tourInfo"]').type("tulkaa")
            cy.get("button[name='submit']").click()
            cy.get("#tourList button").should("have.length", 2)
        })

        it("tour page can be seen by clicking it", function() {
            cy.get("#tourList b:first").click()
            cy.url().should('contain', 'tour')
        })
    })
})