//配置路由信息

export default [
    {
        path: '/home',
        component: ()=>import("@/pages/MyHome"),
        meta: {
            //控制MyFooter组件是否显示
            show: true
        }
    },
    {
        path: '/center',
        component: ()=>import("@/pages/MyCenter"),
        meta: {
            //控制MyFooter组件是否显示
            show: true
        },
        children:[
            {
                path:'myorder',
                component:()=>import("@/pages/MyCenter/myOrder")
            },
            {
                path:'grouporder',
                component:()=>import("@/pages/MyCenter/groupOrder")
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
        component: ()=>import("@/pages/MyLogin"),
        meta: {
            show: false
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=>import("@/pages/MySearch"),
        meta: {
            show: true
        }
    },
    {
        path: '/register',
        component: ()=>import("@/pages/MyRegister"),
        meta: {
            show: false
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuid?',
        component: ()=>import("@/pages/MyDetail"),
        meta: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',
        name: "addcartsuccess",
        component: ()=>import("@/pages/AddCartSuccess"),
        meta: {
            //控制MyFooter组件是否显示
            show: true
        }
    },
    {
        path: '/shopcart',
        name: "shopcart",
        component: ()=>import("@/pages/ShopCart"),
        meta: {
            //控制MyFooter组件是否显示
            show: true
        }
    },
    {
        path: '/trade',
        name: "trade",
        component: ()=>import("@/pages/MyTrade"),
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
        component: ()=>import("@/pages/MyPay"),
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
        component: ()=>import("@/pages/PaySuccess"),
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