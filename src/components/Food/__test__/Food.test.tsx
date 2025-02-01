import { render, screen } from "@testing-library/react";
import Food from "..";
import { FoodType } from "@/types";
import "@testing-library/jest-dom";

const mockFood: FoodType = {
  id: "1",
  name: "Pizza",
  categoryId: "pizza",
  restaurant: "Candra Restaurant",
  imageUrl: "https://google.com/pizza.jpg",
  rating: 4.5,
  minCookTime: 10,
  maxCookTime: 20,
  promotion: "gift",
  isNew: true,
};

const mockFoods: FoodType[] = [mockFood];

describe("Food Component", () => {
  it("It should displays loading skeleton when loading is true", () => {
    render(
      <Food
        loading={true}
        displayedFoods={mockFoods}
        filteredFoods={mockFoods}
      />
    );
    const skeletonLoading = screen.getAllByTestId("skeleton-food-card");
    expect(skeletonLoading.length).toBe(12);
  });

  it("It should displays food list when loading is false", () => {
    render(
      <Food
        loading={false}
        displayedFoods={mockFoods}
        filteredFoods={mockFoods}
      />
    );
    const foodCard = screen.getByRole("listitem");
    expect(foodCard).toBeInTheDocument();
  });

  it("It should renders FoodNewLabel when food is new", () => {
    render(
      <Food
        loading={false}
        displayedFoods={mockFoods}
        filteredFoods={mockFoods}
      />
    );
    const foodNewLabel = screen.getByText("New");
    expect(foodNewLabel).toBeInTheDocument();
  });

  it("It should renders FoodPromotion with the correct promotion", () => {
    render(
      <Food
        loading={false}
        displayedFoods={mockFoods}
        filteredFoods={mockFoods}
      />
    );
    const promotionText = screen.getByLabelText("Promotion: gift");
    expect(promotionText).toBeInTheDocument();
  });

  it("It should renders FoodDetail with the correct food details", () => {
    render(
      <Food
        loading={false}
        displayedFoods={mockFoods}
        filteredFoods={mockFoods}
      />
    );
    const foodName = screen.getByText(mockFood.name);
    const foodRating = screen.getByText(mockFood.rating.toFixed(1));
    const foodCookTime = screen.getByText(
      `${mockFood.minCookTime}-${mockFood.maxCookTime} mins`
    );

    expect(foodName).toBeInTheDocument();
    expect(foodRating).toBeInTheDocument();
    expect(foodCookTime).toBeInTheDocument();
  });
});
