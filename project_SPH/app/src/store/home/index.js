//home首页的数据仓库

//引入接口
import {
    reqCategoryList
} from '@/api'

//数据
const state = {
    categoryList: [],
}
//更新数据
const mutations = {
    CATEGORYLIST(state,categoryList) {
        state.categoryList = categoryList
    }
}
//用户的动作
const actions = {
    //使用接口向服务器请求数据
    async categoryList(context) {
        let result = await reqCategoryList()
        // console.log(result)
        if(result.code==200){
            //如果成功，更新数据
            context.commit('CATEGORYLIST', result.data)
        }
    }
}
//数据加工
const getters = {}

export default {
    //开启命名空间
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}