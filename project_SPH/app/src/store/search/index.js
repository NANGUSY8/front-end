//search首页的数据仓库

//引入接口
import {
    reqSearchInfo
} from '@/api'
//数据
const state = {
    searchList: {}
}
//更新数据
const mutations = {
    GETSEARCHINFO(state, searchList) {
        state.searchList = searchList
    }
}
//用户的动作
const actions = {
    async getSearchInfo({ commit }, params = {}) {
        let result = await reqSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHINFO", result.data)
        }
    }

}
//数据加工:简化数据
const getters = {
    //state:当前仓库的state,不是大仓库的state
    goodsList(state){
        //如果SearchList为空,则goodsList为undefined,[]防止这种情况
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
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