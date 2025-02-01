import { render, screen } from "@testing-library/react";
import FoodNewLabel from "../FoodNewLabel";
import "@testing-library/jest-dom";

it("It should renders the 'New' label when isNew is true", () => {
  render(<FoodNewLabel isNew={true} />);
  const newLabel = screen.getByText(/New/i);
  expect(newLabel).toBeInTheDocument();
});

it("It should not render the 'New' label when isNew is false", () => {
  render(<FoodNewLabel isNew={false} />);
  const newLabel = screen.queryByText(/New/i);
  expect(newLabel).toBeNull();
});

it("It should not render the 'New' label when isNew is not provided", () => {
  render(<FoodNewLabel />);
  const newLabel = screen.queryByText(/New/i);
  expect(newLabel).toBeNull();
});
