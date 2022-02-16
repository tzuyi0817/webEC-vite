import { User } from "./user";

export interface Category {
  Products: Product[];
  StoreId: number;
  image: string;
  name: string;
}

export interface Product {
  ProductCategoryId: number;
  Product_category: Category;
  StoreId: number;
  count: number;
  description: string;
  image: string;
  imageI: string;
  imageII: string;
  launched: boolean;
  name: string;
  price: number;
  Comments: Comment[];
}

export interface Comment {
  Product: Product;
  ProductId: number;
  User: User;
  UserId: number;
  comment: string;
  rating: number;
}