//接口统一管理

//引入二次封装后的axios
import requests from "./request";

//引入mockRequests
import mockRequests from "./mockRequest";

//设置三级联动接口
export const reqCategoryList = () => mockRequests({
    url: '/categoryList',
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

// 设置搜索商品中的接口
// export const reqSearchInfo = (params) => requests({
//     url: '/list',
//     method: 'post',
//     data: params
// })
export const reqSearchInfo = (params) => mockRequests({
    url: '/list',
    method: 'post',
    data: params
})

//设置详情页的接口
// export const reqGoodsList = (skuId) => requests({
//     url: `/item/${skuId}`,
//     method: 'get'
// })
export const reqGoodsList = (skuId) => mockRequests({
    url: `/item/${skuId}`,
    method: 'get'
})

//设置加入购物车将商品信息发送给服务器的接口
// export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
//     url: `/cart/addToCart/${skuId}/${skuNum}`,
//     method: 'post'
// })
export const reqAddOrUpdateShopCart = (skuId, skuNum) => mockRequests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

//设置请求购物车列表的接口
// export const reqCartList = () => requests({
//     url: '/cart/cartList',
//     method: 'get'
// })
export const reqCartList = () => mockRequests({
    url: '/cart/cartList',
    method: 'get'
})

//设置删除购物车产品的接口
// export const reqDeleteCart = (skuId) => requests({
//     url: `/cart/deleteCart/${skuId}`,
//     method: 'delete'
// })
export const reqDeleteCart = (skuId) => mockRequests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

//设置更新购物车产品勾选状态的接口
// export const reqUpdateChecked = (skuId,isChecked) => requests({
//     url: `/cart/checkCart/${skuId}/${isChecked}`,
//     method: 'get'
// })
export const reqUpdateChecked = (skuId,isChecked) => mockRequests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

//设置获取验证码的接口
/* export const reqCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
}) */
export const reqCode = (phone) => mockRequests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

//设置注册用户的接口
/* export const reqRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'post'
}) */
export const reqRegister = (data) => mockRequests({
    url: '/user/passport/register',
    data,
    method: 'post'
})

//设置登录的接口
/* export const reqLogin = (data) => requests({
    url: '/user/passport/login',
    data,
    method: 'post'
}) */
export const reqLogin = (data) => mockRequests({
    url: '/user/passport/login',
    data,
    method: 'post'
})

//设置获取用户登录信息的接口
/* export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
}) */
export const reqUserInfo = () => mockRequests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

//设置退出登录的接口:让服务器清除token
/* export const reqLoginOut = () => requests({
    url: '/user/passport/logout',
    method: 'get'
}) */
export const reqLoginOut = () => mockRequests({
    url: '/user/passport/logout',
    method: 'get'
})


//设置获取用户地址信息的接口
/* export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
}) */
export const reqAddressInfo = () => mockRequests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})


//设置获取订单交易页的接口
/* export const reqTradeInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
}) */
export const reqTradeInfo = () => mockRequests({
    url: '/order/auth/trade',
    method: 'get'
})

//设置提交订单的接口
/* export const reqSubmitOrder = (tradeNo,data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
}) */
export const reqSubmitOrder = (tradeNo,data) => mockRequests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
})

//设置获取交易订单的接口
/* export const reqOrderInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
}) */
export const reqOrderInfo = (orderId) => mockRequests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})

//设置获取订单状态的接口
/* export const reqOrderStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
}) */
export const reqOrderStatus = (orderId) => mockRequests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})

//设置获取我的订单的接口
/* export const reqMyOrder = (page,limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
}) */
export const reqMyOrder = (page,limit) => mockRequests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})