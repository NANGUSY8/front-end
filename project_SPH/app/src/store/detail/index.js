//detail详情的数据仓库

//引入接口
import {
    reqGoodsList
} from '@/api'
//数据
const state = {
    goodsList: {}
}
//更新数据
const mutations = {
    GETGOODSLIST(state, goodsList) {
        state.goodsList = goodsList
    }
}
//用户的动作
const actions = {
    async getGoodsList({ commit }, skuid) {
        let result = await reqGoodsList(skuid)
        if (result.code == 200) {
            commit("GETGOODSLIST", result.data)
        }
    }

}
//数据加工:简化数据
const getters = {
    // state:当前仓库的state,不是大仓库的state
    categoryView(state){
        //如果goodsList为空,则categoryView为undefined,{}防止这种情况
        return state.goodsList.categoryView || {}
    },
    skuInfo(state){
        return state.goodsList.skuInfo || {}
    }
}

export default {
    //开启命名空间cnc
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}