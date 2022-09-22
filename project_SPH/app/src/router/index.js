//引入Vue
import Vue from 'vue'

//引入插件
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'

//引入路由配置
import routes from './routes'

//引入仓库
import store from '@/store'

//使用插件
Vue.use(VueRouter)
Vue.use(VueLazyload, {
    error: require("@/assets/error.gif"),
    loading: require("@/assets/loading.gif")
})


const originalPush = VueRouter.prototype.push
//重写push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//创建实例对象，去管理路由规则
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

//路由守卫:全局前置守卫
router.beforeEach(async (to, from, next) => {
    if (store.state.user.token) {
        //如果有token
        if (store.state.user.userInfo.name) {
            //如果已经登录
            if (to.path == "/login" || to.path == "/register") {
                //要去的路径为登录/注册页面,不放行,去首页
                next("/home")
            } else {
                //去的不是登录/注册页面,放行
                next()
            }
        } else {
            //有token但是没登录,派发请求用户登录信息
            await store.dispatch("user/getUserLoginInfo")
                .then(() => {
                    //成功
                    next()
                })
                .catch((err) => {
                    //失败,token失效,派发清除token请求,重新登录
                    store.dispatch("user/getLoginOut")
                    next("/login")
                })

        }
    } else {
        //没有登录,不能去交易/支付/订单页
        if (to.path.indexOf("trade") != -1 || to.path.indexOf("pay") != "-1" || to.path.indexOf("center") != "-1") {
            //携带有想去的路径的query参数去login
            next(`/login?redirect=${to.path}`)
        } else {
            next()
        }

    }
})
export default router

