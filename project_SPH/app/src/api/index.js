//接口统一管理

//引入二次封装后的axios
import requests from "./request";

//设置三级联动接口
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})