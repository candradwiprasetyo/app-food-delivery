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
    { id: "1", name: "Sushi Roll", categoryId: "sushi" },
    { id: "2", name: "Pizza Margherita", categoryId: "pizza" },
  ];

  beforeEach(() => {
    fetchFoods.mockResolvedValue(mockFoods);
    fetchCategories.mockResolvedValue(mockCategories);
  });

  it("It should render food items after fetching data", async () => {
    render(<Home />);
    await waitFor(() =>
      expect(screen.getByText("Sushi Roll")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Pizza Margherita")).toBeInTheDocument()
    );
  });

  it("It should filter foods based on selected category", async () => {
    render(<Home />);

    await waitFor(() => expect(screen.getByText("Sushi")).toBeInTheDocument());

    fireEvent.click(screen.getByText("Sushi"));

    await waitFor(() => {
      expect(screen.getByText("Sushi Roll")).toBeInTheDocument();
      expect(screen.queryByText("Pizza Margherita")).not.toBeInTheDocument();
    });
  });

  it("It should show 'Sorry, no tasty options found, try a different dish.' if no foods match search term", async () => {
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

  it("It should display error message when fetching data fails", async () => {
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

  it("It should load more foods when 'Load More' button is clicked", async () => {
    const mockFoodsLarge = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Food ${i + 1}`,
      categoryId: "all",
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
