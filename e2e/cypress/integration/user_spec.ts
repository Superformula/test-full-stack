describe("User List", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
  });

  it("Should see a page without users", () => {
    cy.contains("Looks like you don't have any users created yet");
    cy.contains("Create your first user").click();
    cy.contains("Create User");
    cy.contains("Close").click();
    cy.contains("Create User").should("not.exist");
  });

  it("Should create an user, update and delete", () => {
    cy.get('button[aria-roledescription="Create User"]').click();
    cy.get('input[name="name"]')
      .type("Sergio Marcelino")
      .should("have.value", "Sergio Marcelino");
    cy.get('input[name="address"]')
      .type("Rua Iracema Guedes")
      .should("have.value", "Rua Iracema Guedes");

    cy.contains("Rua Iracema Guedes Lins", { timeout: 5000 }).click();
    cy.get('input[name="description"]')
      .type("Project's Author")
      .should("have.value", "Project's Author");

    cy.wait(1000); // after the address is picked, it will need to wait to get the coordinates
    cy.contains("Save").click();

    cy.contains("Create User").should("not.exist");
    cy.contains("Project's Author");
    cy.contains("Sergio Marcelino").click();
    cy.contains("Edit User");

    cy.get('input[name="name"]').should("have.value", "Sergio Marcelino");
    cy.get('input[name="description"]').should(
      "have.value",
      "Project's Author"
    );
    cy.get('input[name="name"]')
      .clear()
      .type("Marcelino")
      .should("have.value", "Marcelino");

    cy.contains("Save").click();

    cy.contains("Edit User").should("not.exist");
    cy.contains("Sergio Marcelino").should("not.exist");
    cy.contains("Marcelino").click();

    cy.get('button[aria-roledescription="Delete User"]').click();

    cy.contains("Edit User").should("not.exist");
    cy.contains("Marcelino").should("not.exist");
  });
});
