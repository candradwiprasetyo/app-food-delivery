import styles from "@/styles/Skeleton.module.css";

export default function SkeletonLoading() {
  return Array.from({ length: 12 }).map((_, index) => (
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
