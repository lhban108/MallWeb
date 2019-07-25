import Vue from 'vue'
import Router from 'vue-router'

import mall from './mall'

import store from '../vuex/index'
import homePage from '@/views/homePage'
import H5Drag from './H5Drag'
Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    ...mall,
    ...H5Drag
  ]
})

router.beforeEach((to, from, next) => {
  let cookies = document.cookie
  if (cookies) {
    let cookiesArr = cookies.split(';')
    let userName = ''
    cookiesArr.forEach(item => {
      if (item.indexOf('userName=') > -1) {
        userName = item.trim().substr(9)
        store.commit('setUserName', userName)
      }
    })
  }
  next()
})
export default router
