describe('Folders CRUD', () => {
  const email = 'bruh@gmail.com';
  const password = '12341234';

  beforeEach(() => {
    // Auth first
    cy.request('GET', 'http://localhost:8000/sanctum/csrf-cookie');

    cy.getCookie('XSRF-TOKEN').then(cookie => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8000/api/login',
        headers: { 'X-XSRF-TOKEN': decodeURIComponent(cookie.value) },
        body: { email, password },
      });
    });

    cy.visit('http://localhost:3000/notes');
  });

  it('can create a folder', () => {
    // Click create folder button (adjust index)
    cy.get('button').eq(3).click();

    // Should see a folder appear in sidebar
    cy.contains('Test').should('exist'); // default new folder name
  });

  it('can edit a folder name', () => {
    // Click folder to activate
    cy.contains('Test').click();

    // Click edit icon using data-cy
    cy.contains('Test')
      .parent()
      .parent()
      .find('[data-cy="edit-folder"]')
      .click();

    // Change name
    cy.get('input').clear().type('Edited Folder{enter}');

    // Assert UI updated
    cy.contains('Edited Folder').should('exist');
  });

  it('can delete a folder', () => {
    // Activate folder
    cy.contains('Edited Folder').click();

    // Click delete icon using data-cy
    cy.contains('Edited Folder')
      .parent()
      .parent()
      .find('[data-cy="delete-folder"]')
      .click();

    // Folder should be gone
    cy.contains('Edited Folder').should('not.exist');
  });
});
