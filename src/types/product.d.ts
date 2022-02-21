import { User } from "./user";
import { CommonType } from "./index";

export interface Category extends CommonType {
  Products: Product[];
  StoreId: number;
  image: string;
  name: string;
}

export interface Product extends CommonType {
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

export interface Comment extends CommonType {
  Product: CommentProduct;
  ProductId: number;
  User: User;
  UserId: number;
  comment: string;
  rating: number;
}

type CommentProduct = Omit<Product, 'Comments' | 'Product_category'> & CommonType;
