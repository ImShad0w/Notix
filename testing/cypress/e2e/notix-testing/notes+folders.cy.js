describe("Notes + folders functionality testing", () => {
  const email = 'bruh@gmail.com';
  const password = '12341234';
  beforeEach(() => {
    // ---- AUTH ----
    cy.request('GET', 'http://localhost:8000/sanctum/csrf-cookie');

    cy.getCookie('XSRF-TOKEN').then(cookie => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8000/api/login',
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(cookie.value),
        },
        body: { email, password },
      });
    });

    cy.visit('http://localhost:3000/notes');
  });
  it("can create a note and a folder", () => {
    cy.get('button').eq(0).click();
    // 2️⃣ Type note title
    cy.get('input[type="text"]').clear().type('My Cypress Note2');

    cy.get("aside").contains("My Cypress Note2");

    // Click create folder button (adjust index)
    cy.get('button').eq(3).click();

    // Should see a folder appear in sidebar
    cy.contains('Test').should('exist'); // default new folder name
  })

  it("can add the current note to the created folder", () => {
    cy.get("div").contains("My Cypress Note2").click();

    cy.get("select").select("Test");

    cy.get("aside").contains("My Cypress Note2").should("not.exist")

    cy.get("aside").contains("Test").click()

    cy.get("aside").contains("My Cypress Note2").should("exist")
  });

  it("can access the notes inside of the folder", () => {
    cy.get("aside").contains("Test").click()

    cy.get("aside").contains("My Cypress Note2").click()

    cy.get('input[type="text"]').should("have.value", "My Cypress Note2")
  })
  it("can remove the note from the folder", () => {
    cy.get("aside").contains("Test").click()
    cy.get("aside").contains("My Cypress Note2").click()
    cy.get("select").select("No folder")
    cy.get("aside").contains("My Cypress Note2").should("exist")
  })

  it("can add note back to folder and delete folder and note still exists", () => {
    cy.get("aside").contains("My Cypress Note2").click()
    cy.get("select").select("Test")
    cy.contains("Test").click()
    cy.contains('Test').parent().parent().find('[data-cy="delete-folder"]').click()
    cy.get("aside").contains("My Cypress Note2").should("exist")
  })
})
