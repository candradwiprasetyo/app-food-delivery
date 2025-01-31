export interface CategoryType {
  id: string;
  name: string;
}

export interface FoodType {
  id: string;
  name: string;
  categoryId: string;
  restaurant: string;
  imageUrl: string;
  rating: number;
  minCookTime: number;
  maxCookTime: number;
  promotion: string;
  isNew: boolean;
}
