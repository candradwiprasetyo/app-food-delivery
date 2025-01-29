"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "../lib/fetchCategories";
import { fetchFoods } from "../lib/fetchFoods";
import { CategoryType, FoodType } from "@/types";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedFoods, setDisplayedFoods] = useState<FoodType[]>([]);
  const [chunkSize, setChunkSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
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

  return (
    <div className={styles.container}>
      <h1>Food Delivery</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.categoryButtons}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`${styles.categoryButton} ${
              selectedCategory === category.id
                ? styles.categoryButtonSelected
                : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className={styles.foodList}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          filteredFoods.slice(0, displayedFoods.length).map((food) => (
            <div key={food.id} className={styles.foodCard}>
              <img
                src={food.imageUrl}
                alt={food.name}
                className={styles.foodImage}
              />
              <h3>{food.name}</h3>
              <p>{food.restaurant}</p>
              <p>Rating: {food.rating.toFixed(1)}</p>
              <p>
                Cook Time: {food.minCookTime}-{food.maxCookTime} mins
              </p>
            </div>
          ))
        )}
      </div>

      {!loading && hasMore && (
        <div className={styles.showMoreButtonContainer}>
          <button
            onClick={loadMore}
            className={styles.showMoreButton}
            disabled={loading}
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}
