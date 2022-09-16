//购物车的数据仓库

//引入接口
import {
    reqCartList
} from '@/api'

//数据
const state = {
    cartList: {},
    
}
//更新数据
const mutations = {
    
}
//用户的动作
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            // commit("GETSEARCHINFO", result.data)
            console.log(result)
        }
    }

}
//数据加工:简化数据
const getters = {
    //state:当前仓库的state,不是大仓库的state
    // goodsList(state){
    //     //如果SearchList为空,则goodsList为undefined,[]防止这种情况
    //     return state.searchList.goodsList || []
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