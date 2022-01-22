export interface ajaxType {
  groupPath: string
  restful: string
}

export interface busType {
  $on?: Function,
  $off?: Function,
  $emit?: Function
}

export interface categoryType {
  id: number
  createdAt: string
  StoreId: number
  image: string
  name: string
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
