import Vue from 'vue'
import App from './App.vue'

//引入仓库
import store from '@/store'

import TypeNav from '@/components/TypeNav'
//注册全局组件
Vue.component(TypeNav.name,TypeNav)

//引入路由
import router from './router'
//关闭生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由信息
  router,
  //注册仓库
  store,
}).$mount('#app')
