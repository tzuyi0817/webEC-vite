import { Method, AxiosInstance } from 'axios';

export type AxiosMethod = Extract<Method, keyof AxiosInstance>;

export interface AjaxType {
  groupPath: string;
  restful: AxiosMethod;
}
