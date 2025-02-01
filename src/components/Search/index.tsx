import { useEffect, useState } from "react";
import styles from "@/styles/Search.module.css";

type SearchProps = {
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
};

export default function Search({ searchTerm, setSearchTerm }: SearchProps) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm || "");

  useEffect(() => {
    setDebouncedTerm(searchTerm || "");
  }, [searchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm?.(debouncedTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedTerm, setSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedTerm(e.target.value);
  };

  const clearSearch = () => {
    setDebouncedTerm("");
    setSearchTerm?.("");
  };

  return (
    <div className={styles.searchContainer}>
      <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      <input
        type="text"
        placeholder="Let’s find some tasty choices"
        value={debouncedTerm}
        onChange={handleChange}
        className={styles.searchInput}
        aria-label="Search for food"
        role="button"
        data-testid="input-search-food"
      />
      {debouncedTerm && (
        <div
          className={styles.searchClear}
          onClick={clearSearch}
          data-testid="clear-search"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      )}
    </div>
  );
}
