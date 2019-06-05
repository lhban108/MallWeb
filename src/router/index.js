import Vue from 'vue'
import Router from 'vue-router'

import GoodsList from '@/views/goodsList'
import Cart from '@/views/cart'
import Address from '@/views/address'
import OrderConfirm from '@/views/orderConfirm'
import OrderSuccess from '@/views/orderSuccess'

import store from '../vuex/index'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'goodsList',
      component: GoodsList
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: OrderSuccess
    }
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
