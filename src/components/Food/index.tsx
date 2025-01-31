import styles from "@/styles/Food.module.css";
import SkeletonLoading from "../SkeletonLoading";
import { FoodType } from "@/types";
import FoodPromotion from "./FoodPromotion";
import FoodNewLabel from "./FoodNewLabel";
import Image from "next/image";
import clsx from "clsx";

type FoodProps = {
  loading: boolean;
  displayedFoods: FoodType[];
  filteredFoods: FoodType[];
};

export default function Food({
  loading,
  displayedFoods,
  filteredFoods,
}: FoodProps) {
  return (
    <div className={styles.foodList} role="list">
      {loading ? (
        <SkeletonLoading />
      ) : (
        filteredFoods.slice(0, displayedFoods.length).map((food) => (
          <div key={food.id} className={styles.foodCard} role="listitem">
            <FoodNewLabel isNew={food.isNew} />
            <Image
              src={food.imageUrl}
              alt={food.name}
              className={styles.foodImage}
              width={200}
              height={200}
            />
            <div className={styles.foodCardDescription}>
              <FoodPromotion promotion={food.promotion} />
              <div className={styles.foodCardDescriptionTitle}>{food.name}</div>
              <div className={styles.foodCardDescriptionRestaurant}>
                {food.restaurant}
              </div>
              <div className={styles.foodCardDescriptionDetail}>
                <div className={styles.foodCardDescriptionRating}>
                  <i
                    className={clsx(
                      "fa-solid fa-star",
                      styles.foodCardDescriptionStar
                    )}
                    aria-hidden="true"
                  ></i>
                  {food.rating.toFixed(1)}
                </div>
                <span className={styles.foodCardDescriptionCookTime}>
                  <i
                    className={clsx(
                      "fa-solid fa-clock",
                      styles.foodCardDescriptionClock
                    )}
                    aria-hidden="true"
                  ></i>
                  {food.minCookTime}-{food.maxCookTime} mins
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
