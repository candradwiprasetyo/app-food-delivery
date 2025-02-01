export async function fetchFoods(): Promise<any[]> {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/wilson-wego/8311b463cd331099e34a1f251dad4cbf/raw/f1b04f9afe0fcc0c9270cb486b927641b7d27436/food.json"
    );
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
