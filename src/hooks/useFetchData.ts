import { useEffect, useState } from "react";
import { fetchCategories } from "../lib/fetchCategories";
import { fetchFoods } from "../lib/fetchFoods";
import { CategoryType, FoodType } from "@/types";

export const useFetchData = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, foodsData] = await Promise.all([
          fetchCategories(),
          fetchFoods(),
        ]);
        setCategories(categoriesData);
        setFoods(foodsData);
      } catch {
        setErrorMessage(
          "Our chef is taking a little break. Refresh the page and let’s get cooking again"
        );
      } finally {
        setCategoryLoading(false);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { categories, foods, loading, categoryLoading, errorMessage };
};
