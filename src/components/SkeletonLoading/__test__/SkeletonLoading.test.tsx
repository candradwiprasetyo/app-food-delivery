import { render, screen } from "@testing-library/react";
import SkeletonLoading from "..";
import "@testing-library/jest-dom";

describe("SkeletonLoading Component", () => {
  test("It should renders 12 skeleton food cards", () => {
    render(<SkeletonLoading />);

    const skeletonCards = screen.getAllByTestId("skeleton-food-card");
    expect(skeletonCards.length).toBe(12);
  });
});
