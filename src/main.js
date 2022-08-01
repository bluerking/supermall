import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


// 在原型上添加$bus,然后new一个Vue实例，作为事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
