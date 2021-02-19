describe("tourPage", function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
        const now = new Date(2020, 7, 8).getTime()
        cy.clock(now)
    })

    afterEach(function() {
        cy.logout()
    })

    describe("customer", function() {
        beforeEach(function() {
            cy.login("CustomerTwo", "CustomerTwo");
            cy.visit('http://localhost:3001/find/museums')
            cy.get('button:last').click()
            cy.get('#extraInfo b:last').click()
        })

        it("can open modal for reserving", function() {
            cy.get('button:first').click()
            cy.get("#reserveTourModal")
        })

        it("can close modal by clicking cancel", function() {
            cy.get('button:first').click()
            cy.get("#reserveTourModal button:last").click()
            cy.get("#reserveTourModal").should("not.exist")
        })
        it("button is disabled at start", function() {
            cy.get('button:first').click()
            cy.get('button[name="ready"]').should("be.disabled")
        })

        it("submit opens modal", function() {
            cy.get('button:first').click()
            cy.get('button[aria-label="Next Month"]').click()
            cy.get('button[aria-label="Next Month"]').click()
            cy.get('div[aria-label="Choose Thursday, October 29th, 2020"]').click()
            cy.get('b[class="11:00"]').click()
            cy.get('input[name="groupName"]').click().type("Ryhmä")
            cy.get('input[name="numberOfPeople"]').click().type("1").type("1")
            cy.get('input[name="groupAge"]').type("gA").type("ga")
            cy.get('input[name="email"]').type("email").type("email")
            cy.get('input[name="groupInfo"]').type("gI").type("gi")
            cy.get('select[name="paymentOptions"]').select("Käteinen").select("Käteinen")
            cy.get('select[name="chosenLanguage"]').select("Suomi").select("Suomi")
            cy.get('button[name="ready"]').click()
            cy.get('div[name="confirm"]')
        })

        it("verification modal is closed by cancel", function() {
            cy.get('button:first').click()
            cy.get('button[aria-label="Next Month"]').click()
            cy.get('button[aria-label="Next Month"]').click()
            cy.get('div[aria-label="Choose Thursday, October 29th, 2020"]').click()
            cy.get('b[class="11:00"]').click()
            cy.get('input[name="groupName"]').click().type("Ryhmä")
            cy.get('input[name="numberOfPeople"]').click().type("1").type("1")
            cy.get('input[name="groupAge"]').type("gA").type("ga")
            cy.get('input[name="email"]').type("email").type("email")
            cy.get('input[name="groupInfo"]').type("gI").type("gi")
            cy.get('select[name="paymentOptions"]').select("Käteinen").select("Käteinen")
            cy.get('select[name="chosenLanguage"]').select("Suomi").select("Suomi")
            cy.get('button[name="ready"]').click()
            cy.get('div[name="confirm"]')
            cy.get("button[name='closeConfirmation']").click()
            cy.get('div[name="confirm"]').should("not.exist")
        })

        it("verification modal is closed by submit", function() {
            cy.get('button:first').click()
            cy.get('button[aria-label="Next Month"]').click()
            cy.get('button[aria-label="Next Month"]').click()
            cy.get('div[aria-label="Choose Thursday, October 29th, 2020"]').click()
            cy.get('b[class="11:00"]').click()
            cy.get('input[name="groupName"]').click().type("Ryhmä")
            cy.get('input[name="numberOfPeople"]').click().type("1").type("1")
            cy.get('input[name="groupAge"]').type("gA").type("ga")
            cy.get('input[name="email"]').type("email").type("email")
            cy.get('input[name="groupInfo"]').type("gI").type("gi")
            cy.get('select[name="paymentOptions"]').select("Käteinen").select("Käteinen")
            cy.get('select[name="chosenLanguage"]').select("Suomi").select("Suomi")
            cy.get('button[name="ready"]').click()
            cy.get('div[name="confirm"]')
            cy.get("button[name='submit']").click()
            cy.get('div[name="confirm"]').should("not.exist")
            cy.contains("Varaus lisätty")
        })
    })
})