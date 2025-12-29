describe('Authentication flow', () => {
  const email = 'bruh@gmail.com';
  const password = '12341234';

  it('can enter app, log out, and log back in', () => {
    // 1️⃣ Get CSRF cookie
    cy.request('GET', 'http://localhost:8000/sanctum/csrf-cookie');

    // 2️⃣ Login
    cy.getCookie('XSRF-TOKEN').then(cookie => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8000/api/login',
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(cookie.value),
        },
        body: {
          email,
          password,
        },
      });
    });

    // 3️⃣ Visit protected page
    cy.visit('http://localhost:3000/notes');
    cy.url().should('include', '/notes');

    // 4️⃣ Logout via UI (third button)
    cy.get('button').eq(2).click();

    // 5️⃣ Should be redirected to login
    cy.url().should('eq', 'http://localhost:3000/');

    // 6️⃣ Protected page should be blocked
    cy.visit('http://localhost:3000/notes');
    cy.url().should('eq', 'http://localhost:3000/');

    // 7️⃣ Login again
    cy.request('GET', 'http://localhost:8000/sanctum/csrf-cookie');

    cy.getCookie('XSRF-TOKEN').then(cookie => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8000/api/login',
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(cookie.value),
        },
        body: {
          email,
          password,
        },
      });
    });

    // 8️⃣ Back to protected page
    cy.visit('http://localhost:3000/notes');
    cy.url().should('include', '/notes');
  });
});

