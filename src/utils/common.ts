import axios from 'axios'
import qs from 'qs'
import { busType, ajaxType, selValType } from './interface'

let $bus: any
const api = axios.create({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })

api.defaults.withCredentials = true
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`
  return config
}, err => Promise.reject(err))



export function ajax(groupPath: string, restful: string): ajaxType {
  return { groupPath, restful }
}

export function getAjax(ajax: ajaxType, data = {}) {
  data = qs.stringify(data)
  api.defaults.timeout = 0
  
  return api[ajax.restful](ajax.groupPath, data).then((response: any) => {
    return response.data
  })
  .catch((error: any) => showToast(error))
}

export function LocalStorage(set: string, key: string, value: any = '') {
  if (set === 'set') {
    let setValue: string

    if (key === 'cartItem') {
      const user = JSON.parse(LocalStorage('get', 'email') as string)
      let localData = JSON.parse(localStorage.getItem(key) as string)
      !localData && (localData = {})
      !(user in localData) && (localData[user] = [])

      if (Object.prototype.toString.call(value) === '[object Object]') {
        const valueId: number = value && value.id
        const index = localData[user].findIndex((item: any) => item.id == valueId)

        ~index 
          ? localData[user][index].quantity += value && value.quantity
          : localData[user] = [...localData[user], value]
      } else {
        localData[user] = [...value]
      }
      setValue = JSON.stringify(localData)
    } 
    else setValue = JSON.stringify(value)
    localStorage.setItem(key, setValue)
  }
  else if (set === 'remove') localStorage.removeItem(key)
  else return localStorage.getItem(key)
}

export function evil(str: string) {
  const fn = Function
  return new fn('return ' + str)()
}

export function getBus(bus: busType): void {
  $bus = bus
}

export function showMsg(html: HTMLElement, fun: Function, cancel = false) {
  const body = document.getElementsByTagName('body')[0]
  body.setAttribute('style', 'overflow:hidden;')
  $bus.$emit('showMsg', { html, fun, cancel })
}

export function showToast(msg: string): void {
  if (msg) $bus.$emit('toast', msg)
}

export function getSortOptions(): selValType[] {
  return [
    { name: '上架時間: 新到舊', query: { key: 'createdAt', value: 'desc' }, value: 'timeDesc' },
    { name: '上架時間: 舊到新', query: { key: 'createdAt', value: 'asc' }, value: 'timeAsc' },
    { name: '價格: 高至低', query: { key: 'price', value: 'desc' }, value: 'priceDesc' },
    { name: '價格: 低至高', query: { key: 'price', value: 'asc' }, value: 'priceAsc' }
  ]
}

export function getCartItem() {
  const localCartItem = JSON.parse(LocalStorage('get', 'cartItem') as string)
  const user = JSON.parse(LocalStorage('get', 'email') as string)
  return localCartItem 
    ? user in localCartItem ? localCartItem[user] : []
    : []
}

Date.prototype.Format = function(fmt: string) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}
