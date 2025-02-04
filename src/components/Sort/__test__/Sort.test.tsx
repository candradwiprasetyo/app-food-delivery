import { render, screen, fireEvent } from "@testing-library/react";
import Sort from "..";
import { sortOptions } from "@/data/sortOptions";

describe("Sort Component", () => {
  test("It should renders sort button", () => {
    render(<Sort sortOption="rating" />);

    const sortButton = screen.getByTestId("button-sort");
    expect(sortButton).toBeInTheDocument();
  });

  test("It should displays sort options when button is clicked", () => {
    render(<Sort sortOption="rating" />);

    const sortButton = screen.getByTestId("button-sort");
    fireEvent.click(sortButton);

    sortOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test("It should calls setSortOption and closes popup when an option is selected", () => {
    const mockSetSortOption = jest.fn();
    render(<Sort sortOption="rating" setSortOption={mockSetSortOption} />);

    const sortButton = screen.getByTestId("button-sort");
    fireEvent.click(sortButton);

    const option = screen.getByText("Promo Gift");
    fireEvent.click(option);

    expect(mockSetSortOption).toHaveBeenCalledWith("promo-gift");
    expect(screen.queryByText("Promo Gift")).not.toBeInTheDocument();
  });

  test("It should closes popup when clicking outside", () => {
    render(<Sort sortOption="rating" />);

    const sortButton = screen.getByTestId("button-sort");
    fireEvent.click(sortButton);

    fireEvent.click(document.body);

    sortOptions.forEach((option) => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument();
    });
  });
});
