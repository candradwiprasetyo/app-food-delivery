import styles from "@/styles/Food.module.css";
import clsx from "clsx";
import { FoodType } from "@/types";

type FoodDetailProps = {
  food: FoodType;
};

export default function FoodDetail({ food }: FoodDetailProps) {
  return (
    <>
      <div className={styles.foodCardDescriptionTitle}>{food.name}</div>
      <div className={styles.foodCardDescriptionRestaurant}>
        {food.restaurant}
      </div>
      <div className={styles.foodCardDescriptionDetail}>
        <div className={styles.foodCardDescriptionRating}>
          <i
            className={clsx("fa-solid fa-star", styles.foodCardDescriptionStar)}
            aria-hidden="true"
            data-testid="icon-star"
          ></i>
          {food.rating ? food.rating.toFixed(1) : "No Rating"}
        </div>
        <span className={styles.foodCardDescriptionCookTime}>
          <i
            className={clsx(
              "fa-solid fa-clock",
              styles.foodCardDescriptionClock
            )}
            aria-hidden="true"
            data-testid="icon-clock"
          ></i>
          {food.minCookTime}-{food.maxCookTime} mins
        </span>
      </div>
    </>
  );
}
