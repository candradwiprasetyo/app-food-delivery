import styles from "@/styles/Skeleton.module.css";

export default function SkeletonLoading() {
  const chunkSize = parseInt(process.env.NEXT_PUBLIC_CHUNK_SIZE || "12", 10);

  return Array.from({ length: chunkSize }).map((_, index) => (
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
