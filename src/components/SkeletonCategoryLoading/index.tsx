import stylesCategory from "@/styles/SkeletonCategory.module.css";

export default function SkeletonCategoryLoading() {
  return Array.from({ length: 6 }).map((_, index) => (
    <div
      className={stylesCategory.skeletonCategory}
      key={index}
      data-testid="skeleton-category-card"
    >
      <div
        className={`${stylesCategory.skeleton} ${stylesCategory.skeletonIcon}`}
      />
      <div
        className={`${stylesCategory.skeleton} ${stylesCategory.skeletonText}`}
      />
    </div>
  ));
}
