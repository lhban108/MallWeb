import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

/**
 * vuex的用法：
 * 1 state: 数据存储在state.js文件中
 *   在其他组件获取state.js中数据的方式: this.$store.state.demoData
 * 2 mutations： 修改state.js中的数据需要通过 mutations.js中的方法去修改
 *   首先在mutations.js中定义方法,在其他组件中调用: this.$store.commit(setDemoData, {param1, param2})
 * 3 getters: getters.js 用来对 state.js中数据进行过滤、改造等
 *   比如我们只需要state.js中 demoData 的age > 30的数据, 则在getters中定义过滤的方法: filterByAge,
 *   并且在需要的组件中调用该方法即可得到过滤后的数据: this.$store.getters.filterByAge
 * 4 actions: 在actions.js中定义获取数据的方法, 在指定的地方调用该方法:
 *    this.$store.dispatch(getDemoDataSync, {param1, param2})
 */
