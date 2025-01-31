import styles from "@/styles/Search.module.css";

type SearchProps = {
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
};

export default function Search({ searchTerm, setSearchTerm }: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchTerm) {
      setSearchTerm(e.target.value);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      <input
        type="text"
        placeholder="Enter food name"
        value={searchTerm}
        onChange={handleChange}
        className={styles.searchInput}
        aria-label="Search for food"
      />
    </div>
  );
}
