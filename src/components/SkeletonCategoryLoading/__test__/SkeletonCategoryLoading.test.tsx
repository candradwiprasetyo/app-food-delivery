import { render, screen } from "@testing-library/react";
import SkeletonCategoryLoading from "..";
import "@testing-library/jest-dom";

describe("SkeletonCategoryLoading Component", () => {
  test("It should renders 6 skeleton category cards", () => {
    render(<SkeletonCategoryLoading />);

    const skeletonCategories = screen.getAllByTestId("skeleton-category-card");
    expect(skeletonCategories.length).toBe(6);
  });
});
