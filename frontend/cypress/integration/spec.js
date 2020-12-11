describe('Test Full Stack', () => {
  it('shows header and searh input', function () {
    cy.visit('http://localhost:3000');
    cy.get('#search').should('be.visible');
  });
});
