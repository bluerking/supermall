import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//1、安装插件
Vue.use(Vuex)

// 2、创建store对象
const state = {
    //  cartList: [商品1， 商品2， 商品3....]  需要添加多个商品
    cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
// 1)、
  // 组件里面如果需要将共享的状态发送到actions里面，需要通过this.$store.dispatch('匹配actions里面的方法', payLoad)分发
  // actions里面：相应的方法(context, payLoad)
  // state属性里面的状态只能在mutations里面修改，才能跟踪数据的改变,所以在需要对数据进行改变的地方，将数据发送到mutations里
  
// 2)、
  // 组件里面如果需要将共享的状态发送到mutations里面，需要通过this.$store.commit('匹配mutations里面的方法', payLoad)
  // store对象里面通过：相应的方法(state, payLoad) 修改数据状态


    // 修改state状态需要通过mutations
    // 并且mutations里面可以跟踪状态的变化

// 3)、
  // mutations中的每个方法尽可能完成单一的事情，所以放到actions里面，只有在需要对数据进行改变的地方将数据发送回来
 
  



//3、挂载到顶层的vue实例当中，成为全局的对象，所有组件都可以访问状态
// 所以导出：
export default store;
