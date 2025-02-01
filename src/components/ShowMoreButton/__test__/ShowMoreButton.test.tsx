import { render, screen, fireEvent } from "@testing-library/react";
import ShowMoreButton from "..";
import "@testing-library/jest-dom";

describe("ShowMoreButton Component", () => {
  test("It should renders 'Show More' button when not loading and hasMore is true", () => {
    render(
      <ShowMoreButton loading={false} hasMore={true} loadMore={() => {}} />
    );

    const button = screen.getByRole("button", {
      name: /load more food items/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  test("Should not render button when hasMore is false", () => {
    render(
      <ShowMoreButton loading={false} hasMore={false} loadMore={() => {}} />
    );

    const button = screen.queryByRole("button", {
      name: /load more food items/i,
    });
    expect(button).not.toBeInTheDocument();
  });

  test("It should calls loadMore function when button is clicked", () => {
    const loadMoreMock = jest.fn();
    render(
      <ShowMoreButton loading={false} hasMore={true} loadMore={loadMoreMock} />
    );

    const button = screen.getByRole("button", {
      name: /load more food items/i,
    });
    fireEvent.click(button);

    expect(loadMoreMock).toHaveBeenCalledTimes(1);
  });
});
