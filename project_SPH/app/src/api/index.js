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
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})
