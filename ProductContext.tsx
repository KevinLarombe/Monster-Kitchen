/**
 * TYPES FOR MONSTER KITCHEN APP
 */

export enum ProductCategory {
  INGREDIENTS = "Baking Ingredients",
  TOOLS = "Tools & Equipment",
  PACKAGING = "Packaging & Display",
  DAIRY = "Dairy & Chilled Goods",
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  isAvailable: boolean;
  imageUrl: string;
  weightOrSize: string;
  brand: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AppState {
  products: Product[];
  currentView: "storefront" | "admin" | "about";
  searchTerm: string;
  selectedCategory: string;
  cart: CartItem[];
}
