describe('📚 Borrow and Return Book - End-to-End Flow', () => {
    const username = 'testuser';
    const password = '123456';
    const testBook = {
      bookId: 'B100',
      title: 'Cypress Book',
      author: 'Test Author',
      totalCopies: 5,
      availableCopies: 5
    };
  
    before(() => {
      // Register test user through API
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/auth/register',
        body: {
          username,
          password,
          role: 'user'
        },
        failOnStatusCode: false // Don't fail if user exists
      });
  
      // Create test book through API
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/books',
        body: testBook,
        failOnStatusCode: false
      });
    });
  
    after(() => {
      // Clean up test data
      cy.request({
        method: 'DELETE',
        url: `http://localhost:5000/api/books/${testBook.bookId}`,
        failOnStatusCode: false
      });
      
      cy.request({
        method: 'DELETE',
        url: `http://localhost:5000/api/users/${username}`,
        failOnStatusCode: false
      });
    });
  
    it('Logs in, borrows, and returns a book', () => {
      // Login through UI
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
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
      cy.contains('Book borrowed successfully').should('exist');
  
      // Go to loans page
      cy.contains('My Loans').click();
  
      // Return the borrowed book
      cy.contains(testBook.title)
        .parents('.loan-card')
        .within(() => {
          cy.contains('Return').click();
        });
  
      // Confirm return
      cy.contains('Book returned successfully').should('exist');
    });
  });