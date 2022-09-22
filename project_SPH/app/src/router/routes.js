//配置路由信息

//引入一级路由组件
import MySearch from '@/pages/MySearch'
import MyLogin from '@/pages/MyLogin'
import MyRegister from '@/pages/MyRegister'
import MyHome from '@/pages/MyHome'
import MyDetail from '@/pages/MyDetail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from "@/pages/ShopCart"
import MyTrade from "@/pages/MyTrade"
import MyPay from "@/pages/MyPay"
import PaySuccess from "@/pages/PaySuccess"
import MyCenter from "@/pages/MyCenter"

//引入二级路由
import myOrder from "@/pages/MyCenter/myOrder"
import groupOrder from "@/pages/MyCenter/groupOrder"

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
        path: '/center',
        component: MyCenter,
        meta: {
            //控制MyFooter组件是否显示
            show: true
        },
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                component:groupOrder
            },
            //重定向
            {
                path:'/center',
                redirect:'/center/myorder'
            },
        ]
        
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
    {
        path: '/addcartsuccess',
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: {
            //控制MyFooter组件是否显示
            show: true
        }
    },
    {
        path: '/shopcart',
        name: "shopcart",
        component: ShopCart,
        meta: {
            //控制MyFooter组件是否显示
            show: true
        }
    },
    {
        path: '/trade',
        name: "trade",
        component: MyTrade,
        meta: {
            //控制MyFooter组件是否显示
            show: true
        },
        //路由守卫:只能由购物车页而来
        beforeEnter:(to,from,next)=>{
            if(from.path=="/shopcart"){
                next()
            }else{
                //待着原地址
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: "pay",
        component: MyPay,
        meta: {
            //控制MyFooter组件是否显示
            show: true
        },
        //路由守卫:只能由交易页而来
        beforeEnter:(to,from,next)=>{
            if(from.path=="/trade"){
                next()
            }else{
                //待着原地址
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        name: "paysuccess",
        component: PaySuccess,
        meta: {
            //控制MyFooter组件是否显示
            show: true
        },
        //路由守卫:只能由支付页而来
        beforeEnter:(to,from,next)=>{
            if(from.path=="/pay"){
                next()
            }else{
                //待着原地址
                next(false)
            }
        }
    },
    //重定向,在项目运行起来时,访问/,定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]