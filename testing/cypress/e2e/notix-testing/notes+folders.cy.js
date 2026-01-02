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

    cy.get("select").select("Test").should("have.value", 1);
  })
})
