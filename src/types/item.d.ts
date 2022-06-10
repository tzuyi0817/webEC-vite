import type { CommonType } from './index';
import type { Order } from './order';
import type { Product } from './product'

export interface Item extends CommonType {
  Order_item: OrderItem;
  Order_items: OrderItem[];
  ProductCategoryId: number;
  StoreId: number;
  count: number;
  description: string;
  image: string;
  imageI: string;
  imageII: string;
  launched: boolean;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  orders: Order[];
  price: number;
  quantity: number;
}

export interface OrderItem extends CommonType {
  OrderId: number;
  ProductId: number;
  price: number;
  quantity: number;
}