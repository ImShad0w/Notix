describe('Notes CRUD', () => {
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

  it('can create a note', () => {
    // 1️⃣ Click "New Note" (adjust index if needed)
    cy.get('button').eq(0).click();

    // 2️⃣ Type note title
    cy.get('input[type="text"]').first().type('My Cypress Note');

    // 3️⃣ Type note content
    cy.get('textarea').type('This note was created by Cypress');

    // 4️⃣ Sidebar should show it
    cy.contains('My Cypress Note').should('exist');
  });


  it("can select and delete a note", () => {
    // Select note
    cy.contains("My Cypress Note").click();

    // Ensure it is the active note
    cy.get('input[type="text"]')
      .should('have.value', 'UntitledMy Cypress Note');

    // Delete it
    cy.get('button').eq(1).click();

    // Confirm it is gone
    cy.contains("UntitledMy Cypress Note").should("not.exist");
  });

  it("can create and modify a note", () => {
    cy.get('button').eq(0).click();

    // 2️⃣ Type note title
    cy.get('input[type="text"]').first().type('My Cypress Note2');

    cy.get('input[type="text"]').first().type('3');

    cy.get("div").contains("UntitledMy Cypress Note23");
  })
});
