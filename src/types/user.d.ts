import { Order } from './order';
import { CommonType } from './index';

export interface User extends CommonType {
  StoreId: number;
  address: string;
  email: string;
  emailVerf: boolean;
  image: string;
  name: string;
  password: string;
  resetPasswordExpires: string | null;
  resetPasswordToken: string | null;
  role: number;
}

export interface UserProfile extends User {
  Orders: Order[];
}
