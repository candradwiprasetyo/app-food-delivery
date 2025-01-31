import styles from "@/styles/DataNotFound.module.css";

export default function DataNotFound() {
  return (
    <div className={styles.dataNotFound}>
      <i className="fa-solid fa-utensils"></i>
      Sorry, no tasty options found, try a different dish.
    </div>
  );
}
