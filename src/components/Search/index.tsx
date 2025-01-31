import { useEffect, useState } from "react";
import styles from "@/styles/Search.module.css";

type SearchProps = {
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
};

export default function Search({ searchTerm, setSearchTerm }: SearchProps) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (setSearchTerm) {
        setSearchTerm(debouncedTerm);
      }
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
    if (setSearchTerm) {
      setSearchTerm("");
    }
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
      />
      {debouncedTerm && (
        <div className={styles.searchClear} onClick={clearSearch}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      )}
    </div>
  );
}
