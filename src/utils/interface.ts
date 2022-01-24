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

export interface categoryType {
  id: number
  createdAt: string
  StoreId: number
  image: string
  name: string
  updatedAt: string
}

export interface productType {
  ProductCategoryId: number
  Product_category: categoryType
  StoreId: number
  count: number
  createdAt: string
  description: string
  id: number
  image: string
  imageI: string
  imageII: string
  launched: boolean
  name: string
  price: number
  updatedAt: string
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