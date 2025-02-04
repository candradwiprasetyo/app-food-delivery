"use client";

import { useMemo, useState, useEffect } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { FoodType } from "@/types/food";
import styles from "@/styles/Home.module.css";
import ShowMoreButton from "@/components/ShowMoreButton";
import Search from "@/components/Search";
import Category from "@/components/Category";
import Food from "@/components/Food";
import DataNotFound from "@/components/DataNotFound";
import ErrorPage from "@/components/ErrorPage";
import Sort from "@/components/Sort";

export default function Home() {
  const { categories, foods, loading, categoryLoading, errorMessage } =
    useFetchData();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedFoods, setDisplayedFoods] = useState<FoodType[]>([]);
  const [sortOption, setSortOption] = useState<string>("rating");

  const foodsPerPage = parseInt(
    process.env.NEXT_PUBLIC_FOODS_PER_PAGE || "12",
    10
  );

  const filteredFoods = useMemo(() => {
    const sortedFoods = foods.filter(
      (food) =>
        (selectedCategory === "all" || food.categoryId === selectedCategory) &&
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOption) {
      case "rating":
        return sortedFoods.sort((a, b) => b.rating - a.rating);
      case "promo-gift":
        return sortedFoods.sort((a, b) => (b.promotion === "gift" ? 1 : -1));
      case "promo-1plus1":
        return sortedFoods.sort((a, b) => (b.promotion === "1+1" ? 1 : -1));
      case "promo-discount":
        return sortedFoods.sort((a, b) =>
          b.promotion === "discount" ? 1 : -1
        );
      case "new-menu":
        return sortedFoods.sort((a, b) => (b.isNew === true ? 1 : -1));
      default:
        return sortedFoods.sort((a, b) => b.rating - a.rating);
    }
  }, [foods, selectedCategory, searchTerm, sortOption]);

  useEffect(() => {
    setDisplayedFoods(filteredFoods.slice(0, foodsPerPage));
  }, [filteredFoods, foodsPerPage]);

  const loadMore = () => {
    if (!loading && displayedFoods.length < filteredFoods.length) {
      const nextFoodsPerPage = filteredFoods.slice(
        displayedFoods.length,
        displayedFoods.length + foodsPerPage
      );
      setDisplayedFoods((prevFoods) => [...prevFoods, ...nextFoodsPerPage]);
    }
  };

  const handleChangeCategory = (categoryId: string) =>
    setSelectedCategory(categoryId);

  const noResultsFound =
    filteredFoods.length === 0 && !loading && searchTerm.length > 0;

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.containerTitle}>Food Delivery</h1>
      <div className={styles.featureContainer}>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Sort sortOption={sortOption} setSortOption={setSortOption} />
      </div>
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
