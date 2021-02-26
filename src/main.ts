import { createApp } from 'vue'
import App from '/@/App.vue'
import '/@/scss/common.scss'
import * as common from '/@/utils/common'
import router from '/@/router/index'
import store from '/@/store/index'
import Loading from '/@/components/Loading.vue'
import axios from 'axios'
import bus from './utils/bus'

const app = createApp(App)
app.use(router)
app.use(store)
app.component('Loading', Loading)
app.provide('$bus', bus)

const getConfig = (filePath: string) => axios.get(filePath)
const path = `/@/configs/groups/${import.meta.env.VITE_APP_BASIC_TYPE}.ts`

const setApiConfig = (path: string) => {
  axios.all([getConfig(path)]).then(axios.spread(apiData => {
    app.provide('$apiPrefixes', common.evil(apiData.data)())
    app.mount('#app')
  })).catch(() => {
    if (!path) setApiConfig(`/@/configs/groups/${import.meta.env.VITE_APP_BASIC_TYPE}.ts`)
  })
}
setApiConfig(path)
