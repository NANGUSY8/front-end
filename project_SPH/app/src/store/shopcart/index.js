//购物车的数据仓库

//引入接口
import {
    reqCartList,
    reqDeleteCart,
    reqUpdateChecked
} from '@/api'

//数据
const state = {
    cartList: [],

}
//更新数据
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
//用户的动作
const actions = {
    //获取购物车数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            // console.log(result.data)
            commit("GETCARTLIST", result.data)

        }
    },
    //删除购物车产品
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            // console.log(result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //更新产品的勾选状态
    async updateCheckedById({ commit }, {skuId,isChecked}) {
        let result = await reqUpdateChecked(skuId,isChecked)
        if (result.code == 200) {
            // console.log(result.data)
            return "ok"
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