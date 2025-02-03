import styles from "@/styles/Food.module.css";
import clsx from "clsx";
import { PromotionType } from "@/types/promotion";

type FoodPromotionProps = {
  promotion?: PromotionType | null;
};

export default function FoodPromotion({ promotion }: FoodPromotionProps) {
  const promotionClasses = {
    [styles.foodCardDescriptionPromotion]: true,
    [styles.foodCardDescriptionPromotionGift]: promotion === "gift",
    [styles.foodCardDescriptionPromotionDiscount]: promotion === "discount",
    [styles.foodCardDescriptionPromotion1plus1]: promotion === "1+1",
  };

  return (
    promotion && (
      <div
        className={clsx(promotionClasses)}
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
