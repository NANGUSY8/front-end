//配置路由信息

//引入路由组件
import MySearch from '@/pages/MySearch'
import MyLogin from '@/pages/MyLogin'
import MyRegister from '@/pages/MyRegister'
import MyHome from '@/pages/MyHome'
import MyDetail from '@/pages/MyDetail'

export default [
    {
        path: '/home',
        component: MyHome,
        meta: {
            //控制MyFooter组件是否显示
            show: true
        }
    },
    {
        path: '/login',
        component: MyLogin,
        meta: {
            show: false
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: MySearch,
        meta: {
            show: true
        }
    },
    {
        path: '/register',
        component: MyRegister,
        meta: {
            show: false
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuid?',
        component: MyDetail,
        meta: {
            show: true
        }
    },
    //重定向,在项目运行起来时,访问/,定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]