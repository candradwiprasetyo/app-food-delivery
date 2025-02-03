import styles from "@/styles/Food.module.css";
import clsx from "clsx";
import { FoodType } from "@/types/food";

type FoodDetailProps = {
  food: FoodType;
};

export default function FoodDetail({ food }: FoodDetailProps) {
  return (
    <article>
      <h3 className={styles.foodCardDescriptionTitle}>{food.name}</h3>
      <p className={styles.foodCardDescriptionRestaurant}>{food.restaurant}</p>
      <div className={styles.foodCardDescriptionDetail}>
        <div
          className={styles.foodCardDescriptionRating}
          role="contentinfo"
          aria-label="Rating"
        >
          <i
            className={clsx("fa-solid fa-star", styles.foodCardDescriptionStar)}
            aria-hidden="true"
            data-testid="icon-star"
          />
          {food.rating?.toFixed(1) ?? "No Rating"}
        </div>
        <span
          className={styles.foodCardDescriptionCookTime}
          role="contentinfo"
          aria-label="Cooking Time"
        >
          <i
            className={clsx(
              "fa-solid fa-clock",
              styles.foodCardDescriptionClock
            )}
            aria-hidden="true"
            data-testid="icon-clock"
          />
          {food.minCookTime && food.maxCookTime
            ? `${food.minCookTime}-${food.maxCookTime} mins`
            : ""}
        </span>
      </div>
    </article>
  );
}
