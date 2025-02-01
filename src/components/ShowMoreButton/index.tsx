import styles from "@/styles/ShowMoreButton.module.css";

type ShowMoreButtonProps = {
  loading?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
};

export default function ShowMoreButton({
  loading,
  hasMore,
  loadMore,
}: ShowMoreButtonProps) {
  return (
    <>
      {!loading && hasMore && (
        <div className={styles.showMoreButtonContainer}>
          <button
            onClick={loadMore}
            className={styles.showMoreButton}
            aria-label="Load more food items"
            role="button"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
}
