import { fetchFoods } from "../fetchFoods";

describe("fetchFoods", () => {
  const API_URL = "https://mock-api.com/foods";

  beforeEach(() => {
    process.env.NEXT_PUBLIC_FOOD_API = API_URL;
    jest.resetAllMocks();
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_FOOD_API;
  });

  it("should return food data when API call is successful", async () => {
    const mockData = {
      foods: [
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
      ],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    );

    const result = await fetchFoods();
    expect(result).toEqual(mockData.foods);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(API_URL);
  });

  it("should throw an error when API URL is not defined", async () => {
    delete process.env.NEXT_PUBLIC_FOOD_API;

    await expect(fetchFoods()).rejects.toThrow("API URL is not defined");
  });

  it("should throw an error when API response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(fetchFoods()).rejects.toThrow("Failed to fetch foods");
  });

  it("should throw the error message when an Error instance occurs", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    await expect(fetchFoods()).rejects.toThrow("Network error");
  });

  it("should throw a generic error message for unknown errors", async () => {
    global.fetch = jest.fn(() => Promise.reject(null));
    await expect(fetchFoods()).rejects.toThrow(
      "An error occurred while retrieving data"
    );
  });
});
