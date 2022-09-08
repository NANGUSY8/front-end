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
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//创建实例对象，去管理路由规则
export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:MyHome,
            meta:{
                //控制MyFooter组件是否显示
                show:true
            }
        },
        {
            path:'/login',
            component:MyLogin,
            meta:{
                show:false
            }
        },
        {
            name:'search',
            path:'/search',
            component:MySearch,
            meta:{
                show:true
            }
        },
        {
            path:'/register',
            component:MyRegister,
            meta:{
                show:false
            }
        },
        //重定向,在项目运行起来时,访问/,定向到首页
        {
            path:'*',
            redirect:'/home'
        }
    ]
})

