import TestIds from "../fixtures/src/utils/testIds.js";

const InBetweenWaitTime = 2000;

describe("Create, Update, and Delete user", () => {
  before(() => {
    cy.visit("http://localhost:3001/");
  });

  it("Can add a user", () => {
    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.AddUserButton}]`).click();

    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.UserNameField}]`).type("New User");
    cy.get(`[data-testid=${TestIds.DateOfBirthField}]`).type("2020-07-11");
    cy.get(`[data-testid=${TestIds.UserAddressField}]`).type("Canada");
    cy.get(`[data-testid=${TestIds.UserDescriptionField}]`).type(
      "New User Description"
    );

    cy.get(`[data-testid=${TestIds.UserFormSubmitButton}`).click();

    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.UserCard}]`, { timeout: 10000 })
      .first()
      .should(($firstElement) => {
        let nameLabel = $firstElement
          .find(`[data-testid=${TestIds.UserNameDisplayLabel}]`)
          .get(0);
        let descriptionLabel = $firstElement
          .find(`[data-testid=${TestIds.UserDescriptionLabel}]`)
          .get(0);

        expect(nameLabel.innerText).to.contain("New User");
        expect(descriptionLabel.innerText).to.contain("New User Description");
      });
  });

  it("Can update a user", () => {
    cy.wait(InBetweenWaitTime);

    let userElements = cy.get(`[data-testid=${TestIds.UserCard}]`);

    userElements
      .first()
      .find(`[data-testid=${TestIds.EditUserButton}]`)
      .click();

    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.UserNameField}]`, { timeout: 10000 })
      .clear()
      .type("New User Updated");

    cy.get(`[data-testid=${TestIds.UserFormSubmitButton}`).click();

    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.UserCard}]`)
      .first()
      .should(($firstElement) => {
        let nameLabel = $firstElement
          .find(`[data-testid=${TestIds.UserNameDisplayLabel}]`)
          .get(0);

        expect(nameLabel.innerText).to.contain("New User Updated");
      });
  });

  it("Can delete a user", () => {
    cy.wait(InBetweenWaitTime);

    let userElements = cy.get(`[data-testid=${TestIds.UserCard}]`);

    userElements
      .first()
      .find(`[data-testid=${TestIds.EditUserButton}]`)
      .click();

    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.DeleteUserButton}]`, { timeout: 10000 })
      .click()
      .wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.UserCard}]`, { timeout: 10000 })
      .first()
      .should(($firstElement) => {
        let nameLabel = $firstElement
          .find(`[data-testid=${TestIds.UserNameDisplayLabel}]`)
          .get(0);
        let descriptionLabel = $firstElement
          .find(`[data-testid=${TestIds.UserDescriptionLabel}]`)
          .get(0);

        expect(nameLabel.innerText).to.not.contain("New User");
        expect(descriptionLabel.innerText).to.not.contain(
          "New User Description"
        );
      });
  });
});
