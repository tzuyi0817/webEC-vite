export interface SelectValue {
  name: string;
  query: RouteQuery;
  value: string;
}

export interface RouteQuery {
  key: string;
  value: string;
}

export interface RouteParams {
  id: string;
}

export interface TimeKeys {
  "M+": number;
  "d+": number;
  "h+": number;
  "m+": number;
  "s+": number;
  "q+": number;
  "S": number;
}