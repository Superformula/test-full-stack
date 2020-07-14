import "../support/environment.js";
import UsersReducer from "../../src/redux/Users/UsersReducer.js";
import AppSyncUserServiceProvider from "../../src/provider/AppSyncUserServiceProvider.js";
import TestIds from "../fixtures/src/utils/testIds.js";
import { createStore } from "redux";

const InBetweenWaitTime = 3000;

describe("Updating ui base on Create, Update, and Delete from another client", () => {
  const userStore = createStore(UsersReducer);
  AppSyncUserServiceProvider.init(userStore);
  before(() => {
    cy.visit("http://localhost:3001/");
  });

  it("Can display user being added from another client", () => {
    cy.get(`[data-testid=${TestIds.UserCard}]`);

    async function addUserFn() {
      await AppSyncUserServiceProvider.addUser({
        name: "New User",
        description: "New User Description",
      });
    }

    addUserFn();

    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.UserCard}]`)
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

  it("Can display user being updated from another client", () => {
    let users = userStore.getState().users;
    AppSyncUserServiceProvider.updateUser({
      id: users[0].id,
      name: "New User Updated",
      description: "",
      address: "",
      dateOfBirth: null,
    });

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

  it("Can display user being removed from another client", () => {
    let users = userStore.getState().users;
    AppSyncUserServiceProvider.deleteUser({
      id: users[0].id,
      name: users[0].name,
    });

    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.UserCard}]`)
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
