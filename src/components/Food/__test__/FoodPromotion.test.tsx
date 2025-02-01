import { render, screen } from "@testing-library/react";
import FoodPromotion from "../FoodPromotion";
import "@testing-library/jest-dom";

it("It should renders 'gift' promotion with the correct icon", () => {
  render(<FoodPromotion promotion="gift" />);
  const giftIcon = screen.getByTestId("icon-gift");
  expect(giftIcon).toBeInTheDocument();
});

it("It should renders 'discount' promotion with the correct percentage", () => {
  render(<FoodPromotion promotion="discount" />);
  const discountText = screen.getByText("%");
  expect(discountText).toBeInTheDocument();
});

it("It should renders '1+1' promotion correctly", () => {
  render(<FoodPromotion promotion="1+1" />);
  const onePlusOneText = screen.getByText("1+1");
  expect(onePlusOneText).toBeInTheDocument();
});

it("It should not render anything when promotion is not provided or null", () => {
  render(<FoodPromotion promotion={null} />);
  const promotionElement = screen.queryByRole("img");
  expect(promotionElement).toBeNull();
});

it("It should not render anything when promotion is an empty string", () => {
  render(<FoodPromotion promotion="" />);
  const promotionElement = screen.queryByRole("img");
  expect(promotionElement).toBeNull();
});
