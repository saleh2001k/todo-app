import { expect, test, describe } from "vitest";
import { render,screen } from "@testing-library/react";
import Footer from "./index";
import "@testing-library/jest-dom";

test("renders the footer text", () => {
  render(<Footer />);

  // Use screen.getByText to select the footer element by its text content
  const footerElement = screen.getByText("©2023 Saleh Almashni");

  // Assert that the footer element is in the document
  expect(footerElement).toBeInTheDocument();
});
