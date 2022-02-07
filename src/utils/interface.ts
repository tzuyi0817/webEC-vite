import { Method, AxiosInstance } from 'axios';

export type axiosMethod = Extract<Method, keyof AxiosInstance>;

export interface ajaxType {
  groupPath: string
  restful: axiosMethod
}

export interface busType {
  $on: Function
  $off: Function
  $emit: Function
}

interface commonType {
  id: number
  createdAt: string
  updatedAt: string
}

export interface categoryType extends commonType {
  StoreId: number
  image: string
  name: string
}

export interface productType extends commonType {
  ProductCategoryId: number
  Product_category: categoryType
  StoreId: number
  count: number
  description: string
  image: string
  imageI: string
  imageII: string
  launched: boolean
  name: string
  price: number
  Comments: commentType[]
}

export interface commentType extends commonType {
  Product: productType
  ProductId: number
  User: userType
  UserId: number
  comment: string
  rating: number
}

export interface userType extends commonType {
  StoreId: number
  address: string
  email: string
  emailVerf: boolean
  image: string
  name: string
  password: string
  resetPasswordExpires: string | null
  resetPasswordToken: string | null
  role: number
}

export interface profileType extends userType {
  Orders: orderType[]
}

export interface orderType extends commonType {
  OrderStatusId: number
  Order_status: orderStatus
  Payments: paymentType[]
  ShipmentConvenienceStore: shipmentConvenienceStore[]
  Shipments: shipmentType[]
  StoreId: number
  UserId: number
  address: string
  amount: number
  items: item[]
  memo: string
  name: string
  phone: string
}

export interface paymentType extends commonType {
  OrderId: number
  PaymentStatusId: number
  PaymentTypeId: number
  Payment_status: paymentStatus
  Payment_type: paymentStatus
  amount: number
}

export interface shipmentType extends shipment {
  Shipment_status: shipmentStatus
  Shipment_type: shipmentStatus
}

export interface shipmentConvenienceStore extends commonType {
  Shipment: shipment
  address: string
  branch: string
}

export interface item extends commonType {
  Order_item: cartItem
  Order_items: cartItem[]
  ProductCategoryId: number
  StoreId: number
  count: number
  description: string
  image: string
  imageI: string
  imageII: string
  launched: boolean
  name: string
  price: number
}

export interface cartItem extends commonType {
  OrderId: number
  ProductId: number
  price: number
  quantity: number
}

export interface shipment extends commonType {
  OrderId: number
  ShipmentConvenienceStoreId: number
  ShipmentStatusId: number
  ShipmentTypeId: number
}

export interface orderStatus extends commonType {
  orderStatus: string
}

export interface paymentStatus extends commonType {
  paymentStatus?: string
  paymentType?: string
}

export interface shipmentStatus extends commonType {
  shipmentStatus?: string
  shipmentType?: string
}

export interface selValType {
  name: string
  query: { key: string, value: string }
  value: string
}

export interface queryType {
  key: string 
  value: string
}

export interface paramsType {
  id: string
}

export interface timeKeys {
  "M+": number
  "d+": number
  "h+": number
  "m+": number
  "s+": number
  "q+": number
  "S": number
}