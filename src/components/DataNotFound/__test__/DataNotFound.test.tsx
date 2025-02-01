import { render, screen } from "@testing-library/react";
import DataNotFound from "..";

describe("DataNotFound Component", () => {
  test("It should renders correct message", () => {
    render(<DataNotFound />);

    expect(
      screen.getByText("Sorry, no tasty options found, try a different dish.")
    ).toBeInTheDocument();
  });

  test("It should renders utensil icon", () => {
    render(<DataNotFound />);

    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });
});
