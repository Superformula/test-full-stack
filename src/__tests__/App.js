import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "App";

test("app renders successfully", async () => {
  render(<App />);

  const header = await screen.getByText("Users List");
  const searchInput = await screen.getByText("Search...");
  const loadMoreButton = await screen.getByText("LOAD MORE");

  expect(header).toBeDefined();
  expect(searchInput).toBeDefined();
  expect(loadMoreButton).toBeDefined();
});
