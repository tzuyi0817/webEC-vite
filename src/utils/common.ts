import axios from 'axios'

type ajaxType = {
  groupPath: string,
  restful: string
}

interface busType {
  $on: Function
  $off: Function
  $emit: Function
}

let $bus: busType
const api = axios.create({ headers: { 'Content-Type': 'application/x-www-form-urlencoded'} })

api.defaults.withCredentials = true
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
}, err => Promise.reject(err))



export function ajax(groupPath: string, restful: string): object {
  return { groupPath, restful }
}

export function getAjax(ajax: ajaxType, data = {}) {
  api.defaults.timeout = 0
  
  return api[ajax.restful](ajax.groupPath, data).then((response: any) => {
    return response.data
  })
  .catch((error: any) => {
    console.log(error)
    showToast('資料獲取和操作失敗')
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