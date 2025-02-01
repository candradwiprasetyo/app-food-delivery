import styles from "@/styles/Food.module.css";
import clsx from "clsx";

type FoodPromotionProps = {
  promotion?: string | null;
};

export default function FoodPromotion({ promotion }: FoodPromotionProps) {
  return (
    promotion && (
      <div
        className={clsx(
          styles.foodCardDescriptionPromotion,
          promotion === "gift" && styles.foodCardDescriptionPromotionGift,
          promotion === "discount" &&
            styles.foodCardDescriptionPromotionDiscount,
          promotion === "1+1" && styles.foodCardDescriptionPromotion1plus1
        )}
        aria-label={`Promotion: ${promotion}`}
      >
        {promotion === "gift" && (
          <i
            className="fa-solid fa-gift"
            aria-hidden="true"
            data-testid="icon-gift"
          ></i>
        )}
        {promotion === "discount" && <span>%</span>}
        {promotion === "1+1" && <span>1+1</span>}
      </div>
    )
  );
}
