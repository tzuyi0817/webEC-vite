import { createApp } from 'vue';
import App from '@/App.vue';
import '@/scss/common.scss';
import { getBus, evil } from '@/utils/common';
import router from '@/router/index';
import { createPinia } from 'pinia';
import Loading from '@/components/Loading.vue';
import axios from 'axios';
import bus from '@/utils/bus';
import { FontAwesomeIcon } from '@/utils/font-awesome';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.component('Loading', Loading);
app.component('icon', FontAwesomeIcon);
app.provide('$bus', bus);

const getConfig = (filePath: string) => axios.get(filePath);

const setApiConfig = (path: string) => {
  axios.all([getConfig(path)]).then(axios.spread(apiData => {
    app.provide('$apiPrefixes', evil(apiData.data)());
    getBus(bus);
    app.mount('#app');
  })).catch(error => {
    throw new Error(error);
  })
};

setApiConfig('/myConfig.ts');
