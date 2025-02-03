import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryButton from "../CategoryButton";
import { CategoryType } from "@/types/category";
import { categoryColorsMap } from "@/data/categoryColor";

const mockCategory: CategoryType = { id: "1", name: "Category 1" };

describe("CategoryButton Component", () => {
  it("It should render the category name correctly", () => {
    render(
      <CategoryButton
        category={mockCategory}
        isSelected={false}
        index={0}
        onClick={jest.fn()}
      />
    );

    expect(screen.getByText(mockCategory.name)).toBeInTheDocument();
  });

  it("It should apply selected styles when isSelected is true", () => {
    render(
      <CategoryButton
        category={mockCategory}
        isSelected={true}
        index={0}
        onClick={jest.fn()}
      />
    );

    const button = screen.getByRole("listitem", {
      name: `Filter by ${mockCategory.name}`,
    });

    expect(button).toHaveClass("categoryButtonSelected");
  });

  it("It should not apply selected styles when isSelected is false", () => {
    render(
      <CategoryButton
        category={mockCategory}
        isSelected={false}
        index={0}
        onClick={jest.fn()}
      />
    );

    const button = screen.getByRole("listitem", {
      name: `Filter by ${mockCategory.name}`,
    });

    expect(button).not.toHaveClass("categoryButtonSelected");
    expect(button).not.toHaveStyle(
      `background-color: ${categoryColorsMap[mockCategory.name] || ""}`
    );
  });

  it("It should call onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <CategoryButton
        category={mockCategory}
        isSelected={false}
        index={0}
        onClick={onClick}
      />
    );

    const button = screen.getByRole("listitem", {
      name: `Filter by ${mockCategory.name}`,
    });

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("It should render the correct image", () => {
    render(
      <CategoryButton
        category={mockCategory}
        isSelected={false}
        index={2}
        onClick={jest.fn()}
      />
    );

    const image = screen.getByRole("img", {
      name: `Category ${mockCategory.name}`,
    });

    expect(image).toHaveAttribute("alt", `Category ${mockCategory.name}`);
  });
});
