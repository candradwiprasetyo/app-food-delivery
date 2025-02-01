import { fetchFoods } from "../fetchFoods";
import { FoodType } from "@/types";

describe("fetchFoods", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("It should return food data when API call is successful", async () => {
    const mockData: FoodType[] = [
      {
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
      },
      {
        id: "2",
        name: "Sushi",
        categoryId: "sushi",
        restaurant: "Candra Restaurant",
        imageUrl: "https://google.com/sushi.jpg",
        rating: 4.7,
        minCookTime: 20,
        maxCookTime: 30,
        promotion: "1+1",
        isNew: false,
      },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    );

    const result = await fetchFoods();
    expect(result).toEqual(mockData.foods);
  });

  it("It should throw an error when API response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(fetchFoods()).rejects.toThrow("Failed to fetch foods");
  });

  it("It should throw the error message when an Error instance occurs", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    await expect(fetchFoods()).rejects.toThrow("Network error");
  });

  it("It should throw a generic error message for unknown errors", async () => {
    global.fetch = jest.fn(() => Promise.reject(null)); // Simulasi error bukan instance Error

    await expect(fetchFoods()).rejects.toThrow(
      "An error occurred while retrieving data"
    );
  });
});
