import type { CommonType } from './index';

export interface Payment extends CommonType {
  OrderId: number;
  PaymentStatusId: number;
  PaymentTypeId: number;
  Payment_status: PaymentStatus;
  Payment_type: PaymentStatus;
  amount: number;
}

export interface PaymentStatus extends CommonType {
  paymentStatus?: string;
  paymentType?: string;
}
