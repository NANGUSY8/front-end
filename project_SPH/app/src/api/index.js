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