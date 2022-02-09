import { createApp } from 'vue';
import App from '/@/App.vue';
import '/@/scss/common.scss';
import { getBus, evil } from '/@/utils/common';
import router from '/@/router/index';
import store from '/@/store/index';
import Loading from '/@/components/Loading.vue';
import axios from 'axios';
import bus from './utils/bus';
import { FontAwesomeIcon } from './utils/font-awesome';

const app = createApp(App);
app.use(router);
app.use(store);
app.component('Loading', Loading);
app.component('icon', FontAwesomeIcon);
app.provide('$bus', bus);

const getConfig = (filePath: string) => axios.get(filePath);
const path = `/@/configs/groups/${import.meta.env.VITE_APP_BASIC_TYPE}.ts`;

const setApiConfig = (path: string) => {
  axios.all([getConfig(path)]).then(axios.spread(apiData => {
    app.provide('$apiPrefixes', evil(apiData.data)());
    getBus(bus);
    app.mount('#app');
  })).catch(() => {
    !path && setApiConfig(`/@/configs/groups/${import.meta.env.VITE_APP_BASIC_TYPE}.ts`);
  })
};
setApiConfig(path);
