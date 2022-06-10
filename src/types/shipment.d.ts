import type { CommonType } from './index';

export interface Shipment extends CommonType {
  OrderId: number;
  ShipmentConvenienceStoreId: number;
  ShipmentStatusId: number;
  ShipmentTypeId: number;
}


export interface ShipmentType extends Shipment {
  Shipment_status: ShipmentStatus;
  Shipment_type: ShipmentStatus;
}

export interface ShipmentConvenienceStore extends CommonType {
  Shipment: Shipment;
  address: string;
  branch: string;
}

export interface ShipmentStatus extends CommonType {
  shipmentStatus?: string;
  shipmentType?: string;
}