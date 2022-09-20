//接口统一管理

//引入二次封装后的axios
import requests from "./request";

//引入mockRequests
import mockRequests from "./mockRequest";

//设置三级联动接口
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})

//设置首页中轮播图接口
export const reqBannerList = () => mockRequests({
    url: '/banners',
    method: 'get'
})

//设置首页中floor接口
export const reqFloorList = () => mockRequests({
    url: '/floors',
    method: 'get'
})

//设置搜索商品中的接口
export const reqSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})

//设置详情页的接口
export const reqGoodsList = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get'
})

//设置加入购物车将商品信息发送给服务器的接口
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

//设置请求购物车列表的接口
export const reqCartList = () => requests({
    url: '/cart/cartList',
    method: 'get'
})

//设置删除购物车产品的接口
export const reqDeleteCart = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

//设置更新购物车产品勾选状态的接口
export const reqUpdateChecked = (skuId,isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

//设置获取验证码的接口
export const reqCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

//设置注册用户的接口
export const reqRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'post'
})

//设置登录的接口
export const reqLogin = (data) => requests({
    url: '/user/passport/login',
    data,
    method: 'post'
})

//设置获取用户登录信息的接口
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

//设置退出登录的接口:让服务器清除token
export const reqLoginOut = () => requests({
    url: '/user/passport/logout',
    method: 'get'
})