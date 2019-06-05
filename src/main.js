// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'

import 'babel-polyfill'

import axios from 'axios'

// import infiniteScroll from 'vue-infinite-scroll'

// 引入icon-font 图标库
import './assets/iconfont/iconfont.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(infiniteScroll)
Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})

Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
