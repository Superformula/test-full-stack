import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "App";

// relies on fast enough internet connection and performant enough hardware
// just operates the UI as if a human were QAing it off a laptop

// these are the only tests implemented, but given more time this is the primary level of testing I'd rely on
// because it is closest to the defintion of "working" a real life user (or product person) would use.

// given more time and a stable featureset, i'd also write unit tests for reducers, and unit tests for thinks.
// as well as snapshot tests, or storybook, for UI components.

test("app renders, loads users, and displays them successfully", async () => {
  render(<App />);

  const loadingMessage = await screen.getByText("Loading...");

  expect(loadingMessage).toBeDefined();

  await waitFor(() => screen.getByTestId("home-page-container"));
  await waitFor(() => screen.getByText("Users List"), { timeout: 5000 });

  const header = await screen.getByText("Users List");
  const searchInput = await screen.getByPlaceholderText("Search...");
  const userCards = await screen.getAllByTestId("user-card");
  const loadMoreButton = await screen.getByText("LOAD MORE");

  expect(header).toBeDefined();
  expect(searchInput).toBeDefined();
  expect(userCards.length).toEqual(6);
  expect(loadMoreButton).toBeDefined();
});

test("user card click results in detail modal display", async () => {
  render(<App />);

  await waitFor(() => screen.getByTestId("home-page-container"), {
    timeout: 5000,
  });
  await waitFor(() => screen.getByText("Users List"), { timeout: 5000 });
  await waitFor(() => screen.getAllByTestId("user-card"), { timeout: 5000 });

  const userCards = await screen.getAllByTestId("user-card");

  fireEvent.click(userCards[0]);

  // explodes here due to mapbox-gl needing to be mocked

  await waitFor(() => screen.getAllByTestId("user-detail-modal-content"), {
    timeout: 5000,
  });
});
