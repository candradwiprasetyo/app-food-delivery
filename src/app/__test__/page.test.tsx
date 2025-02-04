import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { fetchFoods } from "@/lib/fetchFoods";
import { fetchCategories } from "@/lib/fetchCategories";

jest.mock("@/lib/fetchFoods");
jest.mock("@/lib/fetchCategories");

describe("Home Component", () => {
  const mockCategories = [
    { id: "all", name: "All" },
    { id: "sushi", name: "Sushi" },
    { id: "pizza", name: "Pizza" },
  ];

  const mockFoods = [
    {
      id: "1",
      name: "Sushi Roll",
      categoryId: "sushi",
      rating: 4.5,
      promotion: "gift",
      isNew: false,
    },
    {
      id: "2",
      name: "Pizza Margherita",
      categoryId: "pizza",
      rating: 4.8,
      promotion: "discount",
      isNew: true,
    },
    {
      id: "3",
      name: "Cheese Burger",
      categoryId: "burger",
      rating: 4.2,
      promotion: "1+1",
      isNew: false,
    },
  ];

  beforeEach(() => {
    fetchFoods.mockResolvedValue(mockFoods);
    fetchCategories.mockResolvedValue(mockCategories);
  });

  it("should render food items after fetching data", async () => {
    render(<Home />);
    await waitFor(() =>
      expect(screen.getByText("Sushi Roll")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Pizza Margherita")).toBeInTheDocument()
    );
  });

  it("should filter foods based on selected category", async () => {
    render(<Home />);

    await waitFor(() => expect(screen.getByText("Sushi")).toBeInTheDocument());

    fireEvent.click(screen.getByText("Sushi"));

    await waitFor(() => {
      expect(screen.getByText("Sushi Roll")).toBeInTheDocument();
      expect(screen.queryByText("Pizza Margherita")).not.toBeInTheDocument();
    });
  });

  it("should sort foods by rating", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("button-sort"));
    fireEvent.click(screen.getByText("Highest Rating"));

    await waitFor(() => {
      const foodItems = screen.getAllByRole("listitemfood");
      expect(foodItems[0]).toHaveTextContent("Pizza Margherita");
      expect(foodItems[1]).toHaveTextContent("Sushi Roll");
      expect(foodItems[2]).toHaveTextContent("Cheese Burger");
    });
  });

  it("should sort foods by promo gift", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("button-sort"));
    fireEvent.click(screen.getByText("Promo Gift"));

    await waitFor(() => {
      const foodItems = screen.getAllByRole("listitemfood");
      expect(foodItems[0]).toHaveTextContent("Sushi Roll");
    });
  });

  it("should sort foods by promo 1+1", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("button-sort"));
    fireEvent.click(screen.getByText("Promo 1+1"));

    await waitFor(() => {
      const foodItems = screen.getAllByRole("listitemfood");
      expect(foodItems[0]).toHaveTextContent("Cheese Burger");
    });
  });

  it("should sort foods by promo discount", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("button-sort"));
    fireEvent.click(screen.getByText("Promo Discount"));

    await waitFor(() => {
      const foodItems = screen.getAllByRole("listitemfood");
      expect(foodItems[0]).toHaveTextContent("Pizza Margherita");
    });
  });

  it("should sort foods by new menu", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("button-sort"));
    fireEvent.click(screen.getByText("New Menu"));

    await waitFor(() => {
      const foodItems = screen.getAllByRole("listitemfood");
      expect(foodItems[0]).toHaveTextContent("Pizza Margherita");
    });
  });

  it("should show 'Sorry, no tasty options found, try a different dish.' if no foods match search term", async () => {
    render(<Home />);

    await waitFor(() => expect(screen.getByText("Sushi")).toBeInTheDocument());

    fireEvent.change(screen.getByTestId("input-search-food"), {
      target: { value: "Nonexistent" },
    });

    await waitFor(() =>
      expect(
        screen.getByText("Sorry, no tasty options found, try a different dish.")
      ).toBeInTheDocument()
    );
  });

  it("should display error message when fetching data fails", async () => {
    fetchFoods.mockRejectedValue(new Error("Failed to fetch foods"));
    fetchCategories.mockRejectedValue(new Error("Failed to fetch categories"));

    render(<Home />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Our chef is taking a little break. Refresh the page and let’s get cooking again"
        )
      ).toBeInTheDocument();
    });
  });

  it("should load more foods when 'Show More' button is clicked", async () => {
    const mockFoodsLarge = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Food ${i + 1}`,
      categoryId: "all",
      rating: 4.5,
      promotion: "gift",
      isNew: false,
    }));

    fetchFoods.mockResolvedValue(mockFoodsLarge);
    fetchCategories.mockResolvedValue(mockCategories);

    render(<Home />);

    await waitFor(() => expect(screen.getByText("Food 1")).toBeInTheDocument());

    for (let i = 1; i <= 12; i++) {
      expect(screen.getByText(`Food ${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByText("Food 13")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Show More"));

    await waitFor(() =>
      expect(screen.getByText("Food 13")).toBeInTheDocument()
    );

    for (let i = 1; i <= 20; i++) {
      expect(screen.getByText(`Food ${i}`)).toBeInTheDocument();
    }
  });
});
