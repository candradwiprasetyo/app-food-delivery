"use client";

import { useMemo, useState, useEffect } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { FoodType } from "@/types";
import styles from "@/styles/Home.module.css";
import ShowMoreButton from "@/components/ShowMoreButton";
import Search from "@/components/Search";
import Category from "@/components/Category";
import Food from "@/components/Food";
import DataNotFound from "@/components/DataNotFound";
import ErrorPage from "@/components/ErrorPage";

export default function Home() {
  const { categories, foods, loading, categoryLoading, errorMessage } =
    useFetchData();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedFoods, setDisplayedFoods] = useState<FoodType[]>([]);
  const chunkSize = 12;
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

  const noResultsFound =
    filteredFoods.length === 0 && !loading && searchTerm.length > 0;

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

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
      {noResultsFound ? (
        <DataNotFound />
      ) : (
        <Food
          loading={loading}
          displayedFoods={displayedFoods}
          filteredFoods={filteredFoods}
        />
      )}
      {filteredFoods.length > displayedFoods.length && (
        <ShowMoreButton loading={loading} loadMore={loadMore} />
      )}
    </div>
  );
}
