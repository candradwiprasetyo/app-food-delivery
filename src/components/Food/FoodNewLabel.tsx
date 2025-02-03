import styles from "@/styles/Food.module.css";

type FoodNewLabelProps = {
  isNew?: boolean;
};

export default function FoodNewLabel({ isNew }: FoodNewLabelProps) {
  if (!isNew) return null;

  return (
    <div
      className={styles.foodCardNewBadge}
      aria-label="New item"
      role="status"
    >
      New
    </div>
  );
}
