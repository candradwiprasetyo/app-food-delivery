import { CategoryType } from "@/types/category";

export async function fetchCategories(): Promise<CategoryType[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_CATEGORIES_API;
    if (!apiUrl) throw new Error("API URL is not defined");

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch categories");

    const categories = await response.json();
    return [{ id: "all", name: "All" }, ...categories];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while retrieving data");
  }
}
