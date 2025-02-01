"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchCategories } from "../lib/fetchCategories";
import { fetchFoods } from "../lib/fetchFoods";
import { CategoryType, FoodType } from "@/types";
import styles from "@/styles/Home.module.css";
import ShowMoreButton from "@/components/ShowMoreButton";
import Search from "@/components/Search";
import Category from "@/components/Category";
import Food from "@/components/Food";
import DataNotFound from "@/components/DataNotFound";

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedFoods, setDisplayedFoods] = useState<FoodType[]>([]);
  const chunkSize = 12;
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, foodsData] = await Promise.all([
          fetchCategories(),
          fetchFoods(),
        ]);
        setCategories(categoriesData);
        setFoods(foodsData);
      } catch (error) {
        console.error(error);
      } finally {
        setCategoryLoading(false);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredFoods = useMemo(
    () =>
      foods.filter(
        (food) =>
          (selectedCategory === "all" ||
            food.categoryId === selectedCategory) &&
          food.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [foods, selectedCategory, searchTerm]
  );

  useEffect(() => {
    setDisplayedFoods(filteredFoods.slice(0, chunkSize));
  }, [filteredFoods]);

  const loadMore = () => {
    if (!loading && displayedFoods.length < filteredFoods.length) {
      const nextChunk = filteredFoods.slice(
        displayedFoods.length,
        displayedFoods.length + chunkSize
      );
      setDisplayedFoods((prevFoods) => [...prevFoods, ...nextChunk]);
    }
  };

  const handleChangeCategory = (categoryId: string) => {
    if (selectedCategory !== categoryId) {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.containerTitle}>Food Delivery</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Category
        categories={categories}
        categoryLoading={categoryLoading}
        selectedCategory={selectedCategory}
        handleChangeCategory={handleChangeCategory}
      />
      {filteredFoods.length === 0 && !loading && searchTerm.length > 0 ? (
        <DataNotFound />
      ) : (
        <Food
          loading={loading}
          displayedFoods={displayedFoods}
          filteredFoods={filteredFoods}
        />
      )}
      {filteredFoods.length > displayedFoods.length && (
        <ShowMoreButton loading={loading} hasMore={true} loadMore={loadMore} />
      )}
    </div>
  );
}
