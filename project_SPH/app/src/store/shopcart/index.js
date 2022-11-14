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
    //删除选中的产品
    deleteCheckedCart({dispatch,state}){
        let promiseAll =[]
        state.cartList.forEach((item)=>{
           let promise = item.isChecked==1?dispatch("deleteCartById",item.skuId):""
           promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },
    //更新全选的状态
    updateCheckedAll({dispatch,state},isChecked){
        let promiseAll =[]
        state.cartList.forEach((item)=>{
           let promise = dispatch("updateCheckedById",{skuId:item.skuId,isChecked})
           promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }

}
//数据加工:简化数据
const getters = {
}

export default {
    //开启命名空间cnc
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}