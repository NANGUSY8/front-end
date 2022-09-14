//引入Vue
import Vue from 'vue'

//引入VueRouter
import VueRouter from 'vue-router'

//引入路由配置
import routes from './routes'

//使用插件
Vue.use(VueRouter)



const originalPush = VueRouter.prototype.push
//重写push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//创建实例对象，去管理路由规则
export default new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})

