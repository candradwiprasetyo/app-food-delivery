import { PromotionType } from "./promotion";

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
