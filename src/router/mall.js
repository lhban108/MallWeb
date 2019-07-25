import GoodsList from '@/views/mall/goodsList'
import Cart from '@/views/mall/cart'
import Address from '@/views/mall/address'
import OrderConfirm from '@/views/mall/orderConfirm'
import OrderSuccess from '@/views/mall/orderSuccess'
import login from '@/views/mall/login'
import signIn from '@/views/mall/signIn'

const router = [
  {
    path: '/goodsList',
    name: 'goodsList',
    component: GoodsList
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: signIn,
    meth: {
      title: '注册'
    }
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
export default router
