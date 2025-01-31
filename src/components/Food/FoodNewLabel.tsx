import styles from "@/styles/Food.module.css";

type FoodNewLabelProps = {
  isNew?: boolean;
};

export default function FoodNewLabel({ isNew }: FoodNewLabelProps) {
  return (
    isNew && (
      <div className={styles.foodCardNewBadge} aria-label="New item">
        New
      </div>
    )
  );
}
