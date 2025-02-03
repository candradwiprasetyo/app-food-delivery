import styles from "@/styles/Skeleton.module.css";

export default function SkeletonLoading() {
  const foodsPerPage = parseInt(
    process.env.NEXT_PUBLIC_FOODS_PER_PAGE || "12",
    10
  );

  return Array.from({ length: foodsPerPage }).map((_, index) => (
    <div
      className={styles.skeletonFoodCard}
      key={index}
      data-testid="skeleton-food-card"
    >
      <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
      <div className={`${styles.skeleton} ${styles.skeletonText}`} />
      <div
        className={`${styles.skeleton} ${styles.skeletonText} ${styles.short}`}
      />
    </div>
  ));
}
