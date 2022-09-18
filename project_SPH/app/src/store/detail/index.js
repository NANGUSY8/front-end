//detail详情的数据仓库

//引入接口
import {
    reqGoodsList,
    reqAddOrUpdateShopCart
} from '@/api'
//引入 uuid 生成游客身份
import { getUUID } from "@/utils/uuid_token"
//数据
const state = {
    goodsList: {},
    uuid_token: getUUID()
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
    },
    //将加入购物车的商品数量和id提交给服务器
    async postShopCartInfo({ commit }, { skuid, skuNum }) {
        // console.log(skuid,skuNum)
        let result = await reqAddOrUpdateShopCart(skuid, skuNum)
        //只用提交数据给服务器,服务器不用返回信息,所以不用三连环
        if (result.code == 200) {
            //成功
            return "ok"
        } else {
            //失败
            return Promise.reject(new Error("faile")) 
        }
    }

}
//数据加工:简化数据
const getters = {
    // state:当前仓库的state,不是大仓库的state
    categoryView(state) {
        //如果goodsList为空,则categoryView为undefined,{}防止这种情况
        return state.goodsList.categoryView || {}
    },
    skuInfo(state) {
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