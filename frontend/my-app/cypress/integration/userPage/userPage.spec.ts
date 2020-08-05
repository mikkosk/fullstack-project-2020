describe("userPage", function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
    })

    afterEach(function() {
        cy.logout()
    })

    describe("customer", function() {
        beforeEach(function() {
            cy.login("CustomerTwo", "CustomerTwo");
            cy.visit('http://localhost:3000/user')
        })

        it("shows page", function() {
            cy.contains("CustomerTwo")
            cy.contains("Varatut opastukset")
            cy.get("div[name='tourRow']").should('have.length', 2)
        })

        it("clicking tour leads to reservation page", function() {
            cy.get("div[name='tourRow']:first").click()
            cy.url().should('contain', 'reservation')
        })
        
    })

    describe("admin", function() {
        beforeEach(function() {
            cy.login("AdminTwo", "AdminTwo");
            cy.visit('http://localhost:3000/user')
        })

        it("shows page", function() {
            cy.contains("AdminTwo")
            cy.contains("Käyttäjän tiedot")
            cy.contains("Lisää museo!")
            cy.contains("Kaikki museot:")
            cy.get('#adminPage a').should('have.length', 2)
            cy.get("#addMuseumModalOpen")
        })

        it("goes to museum page if museum is clicked", function() {
            cy.get('#adminPage a:first').click()
            cy.url().should('contain', 'museum')
        })
        
        it("opens modal if button is clicked", function() {
            cy.get("#addMuseumModalOpen").click()
            cy.contains("Päivitä opastusta")
        })

        it("closes modal if cancel is clicked", function() {
            cy.get("#addMuseumModalOpen").click()
            cy.contains("Päivitä opastusta")
            cy.get("#cancelMuseumModal").click()
            cy.contains("Päivitä opastusta").should("not.exist")
        })

        it("closes modal if submit is clicked", function() {
            cy.get("#addMuseumModalOpen").click()
            cy.get("input[name='museumName']").type("TestiMuseo")
            cy.get("input[name='museumInfo']").type("TestiMuseo")
            cy.get("input[name='openInfo']").type("TestiMuseo")
            cy.get("input[name='location']").type("TestiMuseo")
            cy.get("input[name='lat']").type("45.00")
            cy.get("input[name='long']").type("45.00")
            cy.get("select[name='open.mon']").select("10:00")
            cy.get("select[name='open.tue']").select("10:00")
            cy.get("select[name='open.wed']").select("10:00")
            cy.get("select[name='open.thu']").select("10:00")
            cy.get("select[name='open.fri']").select("10:00")
            cy.get("select[name='open.sat']").select("10:00")
            cy.get("select[name='open.sun']").select("10:00")
            cy.get("select[name='closed.mon']").select("15:00")
            cy.get("select[name='closed.tue']").select("15:00")
            cy.get("select[name='closed.wed']").select("15:00")
            cy.get("select[name='closed.thu']").select("15:00")
            cy.get("select[name='closed.fri']").select("15:00")
            cy.get("select[name='closed.sat']").select("15:00")
            cy.get("select[name='closed.sun']").select("15:00")
            cy.get("#submitMuseumModal").click()
            cy.contains("TestiMuseo lisätty!")
            cy.contains("Päivitä opastusta").should("not.exist")
        })
    })

    describe("guide", function() {
        beforeEach(function() {
            cy.login("GuideTwo", "GuideTwo");
            cy.visit('http://localhost:3000/user')
        })

        it("opens page correctly", function() {
            cy.contains("GuideTwo")
            cy.get("div[name='ownTours']")
            cy.get("div[name='freeTours']")
            cy.get("div[name='pastTours']")
        })

        it("clicking button reserves the tour", function() {
            cy.get("div[name='freeTours']").get("button:first").click()
            cy.get("div[name='freeTours']").get("button").should("not.exist")
            cy.get("div[name='ownTours'] div[class='row']").should("have.length", 2)
        })
    })

    describe("not logged in", function() {
            it("nothing shows", function() {
                cy.visit('http://localhost:3000/user')
                cy.get("#emptyUserPage")
            })  
    })
})