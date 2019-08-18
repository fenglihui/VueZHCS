// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import moment from 'moment'
import echarts from 'echarts'
import '@/assets/theme/wonderland.js'

//引入全局css样式
import './assets/css/App.css'


Vue.use(ElementUI);


Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.prototype.$moment = moment

Vue.prototype.$echarts = echarts

axios.defaults.baseURL= 'http://112.33.253.33:80/';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
