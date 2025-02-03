import { fetchCategories } from "../fetchCategories";
import { CategoryType } from "@/types/category";

global.fetch = jest.fn();

describe("fetchCategories", () => {
  const API_URL = "https://mock-api.com/categories";

  beforeEach(() => {
    process.env.NEXT_PUBLIC_CATEGORIES_API = API_URL;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch categories successfully", async () => {
    const mockCategories: CategoryType[] = [
      { id: "1", name: "Sushi" },
      { id: "2", name: "Pizza" },
    ];

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockCategories),
    });

    const result = await fetchCategories();

    expect(result).toEqual([{ id: "all", name: "All" }, ...mockCategories]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(API_URL);
  });

  it("should throw an error when API URL is not defined", async () => {
    delete process.env.NEXT_PUBLIC_CATEGORIES_API;

    await expect(fetchCategories()).rejects.toThrow("API URL is not defined");
  });

  it("should throw an error when fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchCategories()).rejects.toThrow(
      "Failed to fetch categories"
    );
  });

  it("should handle network errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    await expect(fetchCategories()).rejects.toThrow("Network error");
  });

  it("should throw a generic error message for unknown errors", async () => {
    (fetch as jest.Mock).mockRejectedValue(null);

    await expect(fetchCategories()).rejects.toThrow(
      "An error occurred while retrieving data"
    );
  });
});
