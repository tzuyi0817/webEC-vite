import axios from 'axios'
import { busType, ajaxType, selValType } from './interface'

let $bus: busType
const api = axios.create({ headers: { 'Content-Type': 'application/x-www-form-urlencoded'} })

api.defaults.withCredentials = true
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
}, err => Promise.reject(err))



export function ajax(groupPath: string, restful: string): ajaxType {
  return { groupPath, restful }
}

export function getAjax(ajax: ajaxType, data = {}) {
  api.defaults.timeout = 0
  
  return api[ajax.restful](ajax.groupPath, data).then((response: any) => {
    return response.data
  })
  .catch((error: any) => {
    console.log(error)
    showToast('資料獲取或操作失敗')
  })
}

export function evil(str: string) {
  const fn = Function
  return new fn('return ' + str)()
}

export function getBus(bus: busType): void {
  $bus = bus
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