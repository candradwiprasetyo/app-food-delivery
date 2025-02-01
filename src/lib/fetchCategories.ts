export async function fetchCategories(): Promise<any[]> {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/wilson-wego/f7381fcead7a47a7df257a97a033456a/raw/33cd31ce75ba72a809d48944463b53b74b9ccae8/categories.json"
    );
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
