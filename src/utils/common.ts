import type { Types } from '@/types';
import axios from 'axios';
import qs from 'qs'

let $bus: Types.Bus;
const api = axios.create({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })

api.defaults.withCredentials = true
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`
  return config
}, err => Promise.reject(err));


export function ajax(groupPath: string, restful: Types.AxiosMethod): Types.AjaxType {
  return { groupPath, restful };
}

export function getAjax(ajax: Types.AjaxType, data = {}) {
  const { restful, groupPath } = ajax;
  data = qs.stringify(data);
  api.defaults.timeout = 0;
  
  return api[restful](groupPath, data).then((response: any) => {
    return response.data
  })
  .catch((error: any) => showToast(error))
}

export function LocalStorage(set: string, key: string, value: any = '') {
  if (set === 'set') {
    let setValue: string

    if (key === 'cartItem') {
      const user = JSON.parse(LocalStorage('get', 'email') as string);
      const localData = JSON.parse(LocalStorage('get', key) as string) ?? {};

      !Object.hasOwn(localData, user) && (localData[user] = []);

      if (typeOf(value) === 'object') {
        const valueId: number = value?.id;
        const cartItem = localData[user].find((item: Types.CartItem) => item.id == valueId);

        cartItem
          ? cartItem.quantity += (value?.quantity ?? 0)
          : localData[user].push(value);
      } else {
        localData[user] = [...value];
      }
      setValue = JSON.stringify(localData);
    }
    else setValue = JSON.stringify(value);
    localStorage.setItem(key, setValue);
  }
  else if (set === 'remove') localStorage.removeItem(key);
  else return localStorage.getItem(key);
}

export function evil(str: string) {
  const fn = Function
  return new fn('return ' + str)()
}

export function getBus(bus: Types.Bus): void {
  $bus = bus
}

export function showMsg(html: HTMLElement, fun: Function, cancel = false) {
  const body = document.getElementsByTagName('body')[0]
  body.setAttribute('style', 'overflow:hidden;')
  $bus.$emit('showMsg', { html, fun, cancel })
}

export function showToast(msg: string): void {
  msg && $bus.$emit('toast', msg);
}

export const SortOptions = [
  { name: '上架時間: 新到舊', query: { key: 'createdAt', value: 'desc' }, value: 'timeDesc' },
  { name: '上架時間: 舊到新', query: { key: 'createdAt', value: 'asc' }, value: 'timeAsc' },
  { name: '價格: 高至低', query: { key: 'price', value: 'desc' }, value: 'priceDesc' },
  { name: '價格: 低至高', query: { key: 'price', value: 'asc' }, value: 'priceAsc' }
];

export function getCartItem() {
  const localCartItem = JSON.parse(LocalStorage('get', 'cartItem') as string);
  const user = JSON.parse(LocalStorage('get', 'email') as string);
  return localCartItem
    ? user in localCartItem ? localCartItem[user] : []
    : [];
}

export function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

export function subContent(str: string | undefined, num: number) {
  if (str === undefined) return '';
  const { length } = str;
  return length > num ? str.slice(0, num + 1) + '...' : str;
};

export function hideName(name: string) {
  return name?.slice(0, 1) + '*****' + name?.slice(-1);
}

export function conversionTime(time: string) {
  return new Date(time).Format('yyyy-MM-dd hh:mm:ss');
}

declare global {
  interface Date {
    Format(fmt?: string): string;
  }
  
  interface ObjectConstructor {
    hasOwn(instance, prop): boolean;
  }
};

Date.prototype.Format = function(fmt: string) {
  const o: Types.TimeKeys = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  };

  type key = keyof Types.TimeKeys;

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (const k in o)
    if (new RegExp('(' + k + ')').test(fmt)) {
      const time = `${o[k as key]}`;
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? time : ('00' + time).substr(('' + time).length));
    }
  return fmt;
}
