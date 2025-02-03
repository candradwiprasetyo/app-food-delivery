import styles from "@/styles/Category.module.css";
import SkeletonCategoryLoading from "@/components/SkeletonCategoryLoading";
import { CategoryType } from "@/types/category";
import CategoryButton from "./CategoryButton";

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
          <CategoryButton
            key={category.id}
            index={index}
            category={category}
            isSelected={selectedCategory === category.id}
            onClick={() => handleChangeCategory?.(category.id)}
          />
        ))
      )}
    </div>
  );
}
