import styles from "@/styles/ShowMoreButton.module.css";

type ShowMoreButtonProps = {
  loading?: boolean;
  loadMore?: () => void;
};

export default function ShowMoreButton({
  loading,
  loadMore,
}: ShowMoreButtonProps) {
  return (
    !loading && (
      <div className={styles.showMoreButtonContainer}>
        <button
          onClick={loadMore}
          className={styles.showMoreButton}
          aria-label="Load more food items"
        >
          Show More
        </button>
      </div>
    )
  );
}
