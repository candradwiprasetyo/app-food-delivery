"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "../lib/fetchCategories";
import { fetchFoods } from "../lib/fetchFoods";
import { CategoryType, FoodType } from "@/types";
import styles from "@/styles/Home.module.css";
import ShowMoreButton from "@/components/ShowMoreButton";
import Search from "@/components/Search";
import Category from "@/components/Category";
import Food from "@/components/Food";

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [displayedFoods, setDisplayedFoods] = useState<FoodType[]>([]);
  const [chunkSize, setChunkSize] = useState<number>(12);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setCategoryLoading(false);
      } catch (error) {
        console.error(error);
        setCategoryLoading(false);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadFoods() {
      setLoading(true);
      try {
        const data = await fetchFoods();
        setFoods(data);
        setDisplayedFoods(data.slice(0, chunkSize));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    loadFoods();
  }, []);

  const loadMore = () => {
    if (!loading && displayedFoods.length < foods.length) {
      const nextChunk = foods.slice(
        displayedFoods.length,
        displayedFoods.length + chunkSize
      );
      setDisplayedFoods((prevFoods) => [...prevFoods, ...nextChunk]);

      if (displayedFoods.length + nextChunk.length >= foods.length) {
        setHasMore(false);
      }
    }
  };

  const filteredFoods = foods
    .filter((food) => {
      return selectedCategory === "all" || food.categoryId === selectedCategory;
    })
    .filter((food) => {
      return food.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  useEffect(() => {
    const isMoreAvailable = displayedFoods.length < filteredFoods.length;
    setHasMore(isMoreAvailable);
  }, [searchTerm, selectedCategory, displayedFoods, filteredFoods]);

  const handleChangeCategory = (categoryId: string) => {
    if (selectedCategory !== categoryId) {
      setSelectedCategory(categoryId);
      setChunkSize(12);
      setDisplayedFoods(foods.slice(0, chunkSize));
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
      <Food
        loading={loading}
        displayedFoods={displayedFoods}
        filteredFoods={filteredFoods}
      />
      <ShowMoreButton loading={loading} hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
}
