import { CategoryType } from "@/types/category";
import Image from "next/image";
import styles from "@/styles/Category.module.css";
import { categoryColorsMap } from "@/data/categoryColor";

export default function CategoryButton({
  category,
  isSelected,
  index,
  onClick,
}: {
  category: CategoryType;
  isSelected: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.categoryButton} ${
        isSelected ? styles.categoryButtonSelected : ""
      }`}
      style={{
        backgroundColor: isSelected
          ? categoryColorsMap[category.name] || ""
          : "",
      }}
      aria-label={`Filter by ${category.name}`}
      role="listitem"
    >
      {category.name}
      <Image
        src={`/assets/images/category-${index}.png`}
        alt={`Category ${category.name}`}
        width={80}
        height={80}
        className={styles.categoryButtonsImage}
      />
    </button>
  );
}
