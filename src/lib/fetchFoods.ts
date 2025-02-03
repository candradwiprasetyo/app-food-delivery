import { FoodType } from "@/types/food";

export async function fetchFoods(): Promise<FoodType[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FOOD_API;
    if (!apiUrl) throw new Error("API URL is not defined");

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch foods");

    const data = await response.json();
    return data.foods;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while retrieving data");
  }
}
