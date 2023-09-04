import { test, describe } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Todo from "./index";

describe("ToDo Component Tests", () => {


  test("initial state is correct", () => {
    const { getByPlaceholderText, getByText } = render(<Todo />);

    const itemDetailsInput = getByPlaceholderText("Item Details");
    const assigneeInput = getByPlaceholderText("Assignee Name");

    expect(itemDetailsInput.value).toBe("");
    expect(assigneeInput.value).toBe("");
  });

 
});
