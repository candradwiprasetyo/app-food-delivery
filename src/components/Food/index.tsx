import styles from "@/styles/Food.module.css";
import SkeletonLoading from "../SkeletonLoading";
import { FoodType } from "@/types/food";
import FoodPromotion from "./FoodPromotion";
import FoodNewLabel from "./FoodNewLabel";
import Image from "next/image";
import FoodDetail from "./FoodDetail";

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
          <div key={food.id} className={styles.foodCard} role="listitemfood">
            <FoodNewLabel isNew={food.isNew} />
            <Image
              src={food.imageUrl}
              alt={food.name}
              className={styles.foodImage}
              width={200}
              height={200}
            />
            <div className={styles.foodCardDescription}>
              <div className={styles.foodCardDescriptionOverlay}></div>
              <FoodPromotion promotion={food.promotion} />
              <FoodDetail food={food} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
