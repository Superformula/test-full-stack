import TestIds from "../fixtures/src/utils/testIds.js";

const InBetweenWaitTime = 2000;

describe("Displaying user list", () => {
  before(() => {
    cy.visit("http://localhost:3001/");
  });

  it("Can display a list of 6 users", () => {
    cy.get(`[data-testid=${TestIds.UserCard}]`).should(($p) => {
      // should have found 3 elements
      expect($p).to.have.length(6);
    });
  });

  it("Can load an additional 6 users when clicking the load more button", () => {
    cy.get(`[data-testid=${TestIds.LoadMoreButton}]`).click();

    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.UserCard}]`).should(($p) => {
      // should have found 3 elements
      expect($p).to.have.length(12);
    });
  });

  it(`Can search for the name "User 1" and display 3 users`, () => {
    cy.get(`[data-testid=${TestIds.SearchTextBox}]`).type("User 1");

    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.UserCard}]`).should(($p) => {
      expect($p).to.have.length(3);
    });
  });

  it("Can clear the search filter", async () => {
    cy.get(`[data-testid=${TestIds.FilterClear}]`).click();

    cy.wait(InBetweenWaitTime);

    cy.get(`[data-testid=${TestIds.UserCard}]`).should(($p) => {
      expect($p).to.have.length(6);
    });
  });
});

describe("Displaying user list via # querystring", () => {
  before(() => {
    cy.visit("http://localhost:3001#limit=12filter=");
  });

  it("Can display a list of 12 users base on query string limit", () => {
    cy.get(`[data-testid=${TestIds.UserCard}]`).should(($p) => {
      expect($p).to.have.length(12);
    });
  });
});
