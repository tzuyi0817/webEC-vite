import type * as AxiosType from '@/types/axios';
import type * as BusType from '@/types/bus';
import type * as ProductType from '@/types/product';
import type * as UserType from '@/types/user';
import type * as OrderType from '@/types/order';
import type * as ItemType from '@/types/item';
import type * as OtherType from '@/types/other';
import type * as CypressType from '@/types/cypress';

export interface CommonType {
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

declare namespace Types {
  export type AxiosMethod = AxiosType.AxiosMethod;
  export type AjaxType = AxiosType.AjaxType;
  export type Bus = BusType.Bus;
  export type Category = Partial<ProductType.Category>;
  export type Product = Partial<ProductType.Product>;
  export type Comment = ProductType.Comment;
  export type User = Partial<UserType.User>;
  export type UserProfile = Partial<UserType.UserProfile>;
  export type Order = Partial<OrderType.Order & CommonType>;
  export type CartItem = ItemType.CartItem & CommonType;
  export type SelectValue = OtherType.SelectValue;
  export type RouteQuery = OtherType.RouteQuery;
  export type RouteParams = OtherType.RouteParams;
  export type TimeKeys = OtherType.TimeKeys;
  export type LoginForm = CypressType.LoginForm;
  export type RegisterForm = CypressType.RegisterForm;
  export type CheckOrderArguments = CypressType.CheckOrderArguments;
}
