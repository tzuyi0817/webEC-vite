import type { OrderType } from '@/types';

export interface LoginForm {
  email: string | null;
  password: string | null;
}

export interface RegisterForm extends LoginForm {
  name: string | null;
  confirmPassword: string | null;
}

export interface CheckOrderArguments {
  orders: OrderType[];
  type: number;
}
