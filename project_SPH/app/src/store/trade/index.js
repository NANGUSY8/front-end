//交易页面的数据仓库

//引入接口
import {
    reqAddressInfo,
    reqTradeInfo
} from '@/api'

//数据
const state = {
    addressInfoList:[],
    tradeInfo:{}
}
//更新数据
const mutations = {
    //获取用户地址信息
    GETADDRESSINFO(state,addressInfoList){
        state.addressInfoList=addressInfoList
        // console.log(addressInfoList);
    },
    //获取交易页订单
    GETTRADEINFO(state,tradeInfo){
        state.tradeInfo=tradeInfo
    },
}
//用户的动作
const actions = {
    //获取用户地址
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            //提交mutations获取服务器数据
            commit("GETADDRESSINFO",result.data)
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //获取订单交易
    async getTradeInfo({ commit }) {
        let result = await reqTradeInfo()
        if (result.code == 200) {
            //提交mutations获取服务器数据
            // console.log(result)
            commit("GETTRADEINFO",result.data)
        } else {
            return Promise.reject(new Error("faile"))
        }
    },

}
//数据加工:简化数据
const getters = {
    //state:当前仓库的state,不是大仓库的state
    cartList(state) {
        return state.cartList[0] || {}
    },
    // cartInfoList(state){
    //     //如果cartList为空,则cartInfoList为undefined,[]防止这种情况
    //     return state.cartList.cartInfoList || []
    // },

}

export default {
    //开启命名空间cnc
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}