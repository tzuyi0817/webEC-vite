import type { CommonType } from './index';
import type { Payment } from './payment';
import type { ShipmentType, ShipmentConvenienceStore } from './shipment';
import type { Item } from './item';

export interface Order {
  OrderStatusId: number;
  Order_status: OrderStatus;
  Payments: Payment[];
  ShipmentConvenienceStore: ShipmentConvenienceStore[];
  Shipments: ShipmentType[];
  StoreId: number;
  UserId: number;
  address: string;
  amount: number;
  items: Item[];
  memo: string;
  name: string;
  phone: string;
}

export interface OrderStatus extends CommonType {
  orderStatus: string;
}
