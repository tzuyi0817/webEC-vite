import axios from 'axios'

type ajaxType = {
  groupPath: string,
  restful: string
}

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
  return api[ajax.restful](ajax.groupPath, data).then((response: any) => {
    return response.data
  })
  .catch((error: any) => {
    console.log(error)
  })
}

export function evil(str: string) {
  const fn = Function
  return new fn('return ' + str)()
}