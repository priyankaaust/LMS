describe('📚 Borrow and Return Book - End-to-End Flow', () => {
    const username = 'testuser';
    const password = '123456';
    const testBook = {
      bookId: 'B' + Date.now(),
      title: 'Cypress Book' + Date.now(),
      author: 'Test Author',
      totalCopies: 5,
      availableCopies: 5,
      coverImage: '/uploads/systemTest.jpg',
      digitalFile: null
    };
  
    let adminToken = '';
    const admin = { username: 'admin', password: 'admin123', role: 'admin' };

before(() => {
  // Try logging in as admin
  cy.request({
    method: 'POST',
    url: 'http://localhost:5000/api/auth/login',
    body: {
      username: admin.username,
      password: admin.password
    },
    failOnStatusCode: false
  }).then((loginRes) => {
    if (loginRes.status === 200) {
      // Admin exists, use token
      adminToken = loginRes.body.token;
      setupBookAndUser();
    } else {
      // Admin doesn't exist, create it
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/auth/register',
        body: admin,
        failOnStatusCode: false
      }).then(() => {
        // Login again to get token
        cy.request({
          method: 'POST',
          url: 'http://localhost:5000/api/auth/login',
          body: {
            username: admin.username,
            password: admin.password
          }
        }).then((res2) => {
          adminToken = res2.body.token;
          setupBookAndUser();
        });
      });
    }
  });

    function setupBookAndUser() {
      // Create book
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/books',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        body: testBook,
        failOnStatusCode: false
      }).then((res) => {
        console.log('Book creation status:', res.status);
        console.log('Book creation response:', res.body);
      
        if (![200, 201].includes(res.status)) {
          console.log('Book info:', testBook);
          throw new Error(`❌ Book creation failed: ${res.status}`);
        }
      });

      // Create test user
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/auth/register',
        body: {
          username,
          password,
          role: 'user'
        },
        failOnStatusCode: false
      });
    }
});
  

  
    it('Logs in, borrows, and returns a book', () => {
      // Login through UI
      cy.visit('http://localhost:3000/login');
      cy.get('input[placeholder="Username"]').type(username);
      cy.get('input[placeholder="Password"]').type(password);
      cy.get('button[type="submit"]').click();
  
      // Wait for redirect to dashboard
      cy.url().should('include', '/dashboard');
  
      // Navigate to books page
      cy.contains('Books').click();
  
      // Find and borrow the test book
      cy.contains(testBook.title)
        .parents('.book-card')
        .within(() => {
          cy.contains('Borrow').click();
        });
  
      // Check for success message
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Book borrowed!');
      });
  
      // Go to loans page
      cy.contains('Loans').click();

      cy.window().then((win) => {
        cy.stub(win, 'alert').as('alert');
      });
  
      // Return the borrowed book
      cy.contains(testBook.title)
        .parents('.loan-card')
        .within(() => {
          cy.contains('Return').click();
        });

      // Assert the alert was called with the expected message
      cy.get('@alert').should('have.been.calledWith', 'Book returned successfully');


    });
  });