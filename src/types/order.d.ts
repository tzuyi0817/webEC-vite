import { CommonType } from './index';
import { Payment } from './payment';
import { ShipmentType, ShipmentConvenienceStore } from './shipment';
import { Item } from './item';

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
