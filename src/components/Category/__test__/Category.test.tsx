import { render, screen, fireEvent } from "@testing-library/react";
import Category from "..";
import { CategoryType } from "@/types";

const mockCategories: CategoryType[] = [
  { id: "1", name: "Category 1" },
  { id: "2", name: "Category 2" },
  { id: "3", name: "Category 3" },
];

describe("Category Component", () => {
  it("It should renders loading skeleton when categoryLoading is true", () => {
    render(
      <Category
        categories={mockCategories}
        categoryLoading={true}
        selectedCategory=""
      />
    );

    const skeletons = screen.queryAllByTestId("skeleton-category-card");
    expect(skeletons.length).toBe(6);
  });

  it("It should renders categories when categoryLoading is false", () => {
    render(
      <Category
        categories={mockCategories}
        categoryLoading={false}
        selectedCategory=""
      />
    );

    mockCategories.forEach((category) => {
      const categoryButton = screen.getByRole("listitem", {
        name: `Filter by ${category.name}`,
      });
      expect(categoryButton).toBeInTheDocument();
    });
  });

  it("It should adds selected class to the selected category", () => {
    render(
      <Category
        categories={mockCategories}
        categoryLoading={false}
        selectedCategory="2"
      />
    );

    const selectedButton = screen.getByRole("listitem", {
      name: /Filter by Category 2/i,
    });
    expect(selectedButton).toHaveClass("categoryButtonSelected");
    expect(selectedButton).toHaveAttribute("aria-pressed", "true");
  });

  it("It should calls handleChangeCategory when a category is clicked", () => {
    const handleChangeCategory = jest.fn();
    render(
      <Category
        categories={mockCategories}
        categoryLoading={false}
        selectedCategory=""
        handleChangeCategory={handleChangeCategory}
      />
    );

    const categoryButton = screen.getByRole("listitem", {
      name: /Filter by Category 1/i,
    });
    fireEvent.click(categoryButton);

    expect(handleChangeCategory).toHaveBeenCalledWith("1");
  });
});
