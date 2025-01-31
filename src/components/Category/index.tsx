import Image from "next/image";
import styles from "@/styles/Category.module.css";
import SkeletonCategoryLoading from "@/components/SkeletonCategoryLoading";
import { CategoryType } from "@/types";
import { categoryColor } from "@/data/categoryColor";

type CategoryProps = {
  categories: CategoryType[];
  categoryLoading: boolean;
  selectedCategory: string;
  handleChangeCategory?: (categoryId: string) => void;
};

export default function Category({
  categories,
  categoryLoading,
  selectedCategory,
  handleChangeCategory,
}: CategoryProps) {
  return (
    <div className={styles.categoryButtons} role="list">
      {categoryLoading ? (
        <SkeletonCategoryLoading />
      ) : (
        categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => {
              if (handleChangeCategory) {
                handleChangeCategory(category.id);
              }
            }}
            className={`${styles.categoryButton} ${
              selectedCategory === category.id
                ? styles.categoryButtonSelected
                : ""
            }`}
            style={{
              backgroundColor:
                selectedCategory === category.id ? categoryColor[index] : "",
            }}
            aria-pressed={selectedCategory === category.id}
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
        ))
      )}
    </div>
  );
}
