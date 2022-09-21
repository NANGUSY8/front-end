import Vue from 'vue'
import App from '@/App.vue'

//引入仓库
import store from '@/store'

import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

//引入路由
import router from '@/router'

//引入API
import * as API from '@/api'

//引入轮播图样式
import 'swiper/css/swiper.min.css'

//引入mockServer,模拟数据
import '@/mock/mockServer'

//关闭生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由信息,注册完后,不管是路由组件还是非路由组件,身上都有$route/$router属性
  router,
  //注册仓库
  store,

  beforeCreate() {
    //注册全局事件总线
    Vue.prototype.$bus = this
    //注册API
    Vue.prototype.$API = API
  }
}).$mount('#app')