import { render, screen } from "@testing-library/react";
import FoodDetail from "../FoodDetail";
import { FoodType } from "@/types/food";

const mockFood: FoodType = {
  id: "1",
  name: "Pizza",
  categoryId: "pizza",
  restaurant: "Candra Restaurant",
  imageUrl: "/images/pizza-margherita.jpg",
  rating: 4.5,
  minCookTime: 10,
  maxCookTime: 15,
  promotion: "1+1",
  isNew: true,
};

describe("FoodDetail", () => {
  it("It should renders food name correctly", () => {
    render(<FoodDetail food={mockFood} />);
    const foodName = screen.getByText(/Pizza/i);
    expect(foodName).toBeInTheDocument();
  });

  it("It should renders restaurant name correctly", () => {
    render(<FoodDetail food={mockFood} />);
    const restaurantName = screen.getByText(/Candra Restaurant/i);
    expect(restaurantName).toBeInTheDocument();
  });

  it("It should displays rating with one decimal place", () => {
    render(<FoodDetail food={mockFood} />);
    const rating = screen.getByText(/4.5/i);
    expect(rating).toBeInTheDocument();
  });

  it("It should displays correct cook time range", () => {
    render(<FoodDetail food={mockFood} />);
    const cookTime = screen.getByText(/10-15 mins/i);
    expect(cookTime).toBeInTheDocument();
  });

  it("It should displays the correct food icon for rating", () => {
    render(<FoodDetail food={mockFood} />);
    const starIcon = screen.getByTestId("icon-star");
    expect(starIcon).toBeInTheDocument();
  });

  it("It should displays the correct food icon for cook time", () => {
    render(<FoodDetail food={mockFood} />);
    const clockIcon = screen.getByTestId("icon-clock");
    expect(clockIcon).toBeInTheDocument();
  });

  it("It should display 'No Rating' when rating is not available", () => {
    const foodWithoutRating = { ...mockFood, rating: null };
    render(<FoodDetail food={foodWithoutRating} />);
    const rating = screen.getByText(/No Rating/i);
    expect(rating).toBeInTheDocument();
  });

  it("It should display rating with one decimal place when rating is available", () => {
    render(<FoodDetail food={mockFood} />);
    const rating = screen.getByText(/4.5/i);
    expect(rating).toBeInTheDocument();
  });
});
