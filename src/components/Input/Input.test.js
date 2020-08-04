import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

const labelValueInputTests = () => {
  const utils = render(<Input label="test-input" value="Bad Day!" />);
  const input = utils.getByLabelText("test-input");
  return {
    input,
    ...utils,
  };
};

test("It should properly populate when value prop is passed to it", () => {
  const { input } = labelValueInputTests();
  expect(input.value).toBe("Bad Day!");
});

test("It should keep track of changes", () => {
  const { input } = labelValueInputTests();
  fireEvent.change(input, { target: { value: "Nice Day!" } });
  expect(input.value).toBe("Nice Day!");
});

const emptyInputTests = () => {
  const utils = render(
    <Input placeholder="Type Something" label="empty-input" />
  );
  const input = utils.getByLabelText("empty-input");
  return {
    input,
    ...utils,
  };
};

test("It should properly populate when value prop is passed to it", () => {
  const { input } = emptyInputTests();
  expect(input.value).toBe("");
  expect(input.placeholder).toBe("Type Something");
});
