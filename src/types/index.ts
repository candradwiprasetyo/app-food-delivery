export interface CategoryType {
  id: string;
  name: string;
}

export enum PromotionType {
  Gift = "gift",
  Discount = "discount",
  OnePlusOne = "1+1",
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
  promotion: PromotionType | null;
  isNew: boolean;
}
