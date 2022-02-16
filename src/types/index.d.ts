import * as AxiosType from '@/types/axios';
import * as BusType from '@/types/bus';
import * as ProductType from '@/types/product';
import * as UserType from '@/types/user';
import * as OrderType from '@/types/order';
import * as ItemType from '@/types/item';
import * as OtherType from '@/types/other';

export interface CommonType {
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

declare namespace Types {
  export type AxiosMethod = AxiosType.AxiosMethod;
  export type AjaxType = AxiosType.AjaxType;
  export type Bus = BusType.Bus;
  export type Category = Partial<ProductType.Category & CommonType>;
  export type Product = Partial<ProductType.Product & CommonType>;
  export type Comment = ProductType.Comment & CommonType;
  export type User = Partial<UserType.User & CommonType>;
  export type UserProfile = Partial<UserType.UserProfile & CommonType>;
  export type Order = Partial<OrderType.Order & CommonType>;
  export type CartItem = ItemType.CartItem & CommonType;
  export type SelectValue = OtherType.SelectValue;
  export type RouteQuery = OtherType.RouteQuery;
  export type RouteParams = OtherType.RouteParams;
  export type TimeKeys = OtherType.TimeKeys;
}
