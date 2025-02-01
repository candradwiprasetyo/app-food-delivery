import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "..";

describe("Search Component", () => {
  it("It should renders search input with the given searchTerm", () => {
    render(<Search searchTerm="apple" />);
    const input = screen.getByPlaceholderText(/let’s find some tasty choices/i);
    expect(input).toHaveValue("apple");
  });

  it("It should updates debouncedTerm after typing", async () => {
    jest.useFakeTimers();

    const setSearchTerm = jest.fn();
    render(<Search setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText(/let’s find some tasty choices/i);
    fireEvent.change(input, { target: { value: "banana" } });

    expect(setSearchTerm).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    await waitFor(() => expect(setSearchTerm).toHaveBeenCalledWith("banana"));
    jest.useRealTimers();
  });

  it("It should calls setSearchTerm when input is cleared", async () => {
    const setSearchTerm = jest.fn();
    render(<Search searchTerm="carrot" setSearchTerm={setSearchTerm} />);

    const clearButton = screen.getByTestId("clear-search");
    fireEvent.click(clearButton);

    const input = screen.getByPlaceholderText(/let’s find some tasty choices/i);
    await waitFor(() => expect(input).toHaveValue(""));
    expect(setSearchTerm).toHaveBeenCalledWith("");
  });

  it("Should not show clear button when there is no debouncedTerm", () => {
    render(<Search searchTerm="" />);
    const clearButton = screen.queryByTestId("clear-search");
    expect(clearButton).toBeNull();
  });

  it("It should show clear button when debouncedTerm is set", () => {
    render(<Search searchTerm="onion" />);
    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeInTheDocument();
  });
});
