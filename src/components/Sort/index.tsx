import { sortOptions } from "@/data/sortOptions";
import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "@/styles/Sort.module.css";

type SortProps = {
  sortOption: string;
  setSortOption?: (value: string) => void;
};

export default function Sort({ sortOption, setSortOption }: SortProps) {
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleSortSelect = (value: string) => {
    setSortOption?.(value);
    setShowSortOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(`.${styles.sortContainer}`)) {
        setShowSortOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className={styles.sortContainer}
        onClick={() => setShowSortOptions((prev) => !prev)}
        data-testid="button-sort"
      >
        <i
          className="fa-solid fa-arrow-up-wide-short"
          aria-label="Sort options"
        ></i>
      </div>
      {showSortOptions && (
        <>
          <div className={styles.sortPopupOverlay}></div>
          <div className={styles.sortPopup}>
            {sortOptions.map((option) => (
              <div
                key={option.id}
                className={clsx(
                  styles.sortPopupList,
                  sortOption === option.id && styles.selectedSortPopupList
                )}
                onClick={() => handleSortSelect(option.id)}
              >
                {option.label}
                <i
                  className={clsx(
                    "fa-solid fa-circle-check",
                    styles.sortPopupListIcon
                  )}
                ></i>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
