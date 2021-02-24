import { createApp } from 'vue'
import App from '/@/App.vue'
import '/@/index.scss'
import router from '/@/router/index'
import store from '/@/store/index'
import * as common from '/@/utils/common'
import axios from 'axios'

const app = createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.common = common

const getConfig = (filePath: string) => axios.get(filePath)
const path = `/@/configs/groups/${import.meta.env.VITE_APP_BASIC_TYPE}.ts`

const setApiConfig = (path: string) => {
  axios.all([getConfig(path)]).then(axios.spread(apiData => {
    app.config.globalProperties.$apiPrefixes = common.evil(apiData.data)()
    app.mount('#app')
  })).catch(() => {
    if (!path) setApiConfig(`/@/configs/groups/${import.meta.env.VITE_APP_BASIC_TYPE}.ts`)
  })
}
setApiConfig(path)
