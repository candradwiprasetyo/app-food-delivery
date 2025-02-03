import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Category from "..";
import { CategoryType } from "@/types/category";

const mockCategories: CategoryType[] = [
  { id: "1", name: "Category 1" },
  { id: "2", name: "Category 2" },
  { id: "3", name: "Category 3" },
];

describe("Category Component", () => {
  it("It should render loading skeleton when categoryLoading is true", () => {
    render(
      <Category
        categories={mockCategories}
        categoryLoading={true}
        selectedCategory=""
      />
    );

    const skeletons = screen.getAllByTestId("skeleton-category-card");
    expect(skeletons.length).toBe(6);
  });

  it("It should render category buttons when categoryLoading is false", () => {
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

  it("It should add selected class to the selected category", () => {
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
  });

  it("It should call handleChangeCategory when a category is clicked", async () => {
    const user = userEvent.setup();
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

    await user.click(categoryButton);

    expect(handleChangeCategory).toHaveBeenCalledWith("1");
    expect(handleChangeCategory).toHaveBeenCalledTimes(1);
  });
});
