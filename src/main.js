import "babel-polyfill"
import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import directive from "./directive/directives.js" //自定义指令lu
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import './assets/custom-theme/index.css'
import './assets/yh-css/yh.css'//全局层叠ele样式表
import './assets/yh-css/houjinye.css'
import './assets/yh-css/lukuankuan.css'//全局层叠ele样式表
import './assets/yh-css/fengxunchuang.css'//全局层叠ele样式表
import './assets/yh-css/zhongjinpeng.css'//全局层叠ele样式表
import './assets/yh-css/ProductCustomer.css'//全局层叠ele样式表
import echarts from 'echarts'//全局引入echarts
Vue.prototype.$echarts = echarts

import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data
import * as filters from './filters' // global filters

import 'font-awesome/scss/font-awesome.scss'

import axios from 'axios'

import uploader from 'vue-simple-uploader'//文件上传组件
Vue.use(uploader)
Vue.use(directive)
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
