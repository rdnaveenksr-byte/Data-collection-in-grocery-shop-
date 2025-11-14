
export enum GroceryCategory {
  FRUITS_VEGETABLES = 'Fruits & Vegetables',
  DAIRY_EGGS = 'Dairy & Eggs',
  MEAT_SEAFOOD = 'Meat & Seafood',
  BAKERY = 'Bakery',
  PANTRY = 'Pantry',
  FROZEN = 'Frozen',
  BEVERAGES = 'Beverages',
  OTHER = 'Other',
}

export interface GroceryItem {
  id: string;
  name: string;
  category: GroceryCategory;
  price: number;
  quantity: number;
  description: string;
  imageUrl?: string;
}
