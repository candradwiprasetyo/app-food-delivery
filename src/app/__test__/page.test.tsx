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
});
