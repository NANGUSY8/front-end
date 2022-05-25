//引入Vue
import Vue from 'vue'

//引入VueRouter
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter)

//引入路由组件
import MySearch from '@/pages/MySearch'
import MyLogin from '@/pages/MyLogin'
import MyRegister from '@/pages/MyRegister'
import MyHome from '@/pages/MyHome'

//创建实例对象，去管理路由规则
export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:MyHome
        },
        {
            path:'/login',
            component:MyLogin
        },
        {
            path:'/search',
            component:MySearch
        },
        {
            path:'/register',
            component:MyRegister
        },
        //重定向
        {
            path:'*',
            redirect:'/home'
        }
    ]
})

