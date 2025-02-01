import { render, screen, fireEvent } from "@testing-library/react";
import ShowMoreButton from "..";
import "@testing-library/jest-dom";

describe("ShowMoreButton Component", () => {
  test("It should calls loadMore function when button is clicked", () => {
    const loadMoreMock = jest.fn();
    render(<ShowMoreButton loading={false} loadMore={loadMoreMock} />);

    const button = screen.getByRole("button", {
      name: /load more food items/i,
    });
    fireEvent.click(button);

    expect(loadMoreMock).toHaveBeenCalledTimes(1);
  });
});
