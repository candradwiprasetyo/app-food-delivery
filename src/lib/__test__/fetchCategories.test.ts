import { fetchCategories } from "@/lib/fetchCategories";
import { CategoryType } from "@/types";

global.fetch = jest.fn();

describe("fetchCategories", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("It should fetch categories successfully", async () => {
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
    expect(fetch).toHaveBeenCalledWith(
      "https://gist.githubusercontent.com/wilson-wego/f7381fcead7a47a7df257a97a033456a/raw/33cd31ce75ba72a809d48944463b53b74b9ccae8/categories.json"
    );
  });

  it("It should throw an error when fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchCategories()).rejects.toThrow(
      "Failed to fetch categories"
    );
  });

  it("It should handle network errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    await expect(fetchCategories()).rejects.toThrow("Network error");
  });

  it("It should throw a generic error message for unknown errors", async () => {
    (fetch as jest.Mock).mockRejectedValue(null); // Simulasi error bukan instance Error

    await expect(fetchCategories()).rejects.toThrow(
      "An error occurred while retrieving data"
    );
  });
});
