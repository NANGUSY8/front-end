//home首页的数据仓库

//引入接口
import {
    reqCategoryList,
    reqBannerList,
    reqFloorList
} from '@/api'

//数据
const state = {
    //三级联动菜单数据
    categoryList: [],
    //首页轮播图数据
    bannerList:[],
    //首页floor数据
    floorList:[]
}
//更新数据
const mutations = {
    GETCATEGORYLIST(state,categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    },
}
//用户的动作
const actions = {
    //使用接口向服务器请求三级联动菜单数据
    async getCategoryList({commit}) {
        let result = await reqCategoryList()
        // console.log(result)
        if(result.code==200){
            //如果成功，更新数据
            commit('GETCATEGORYLIST', result.data)
        }
    },
    //使用接口向mock接口请求轮播图数据
    async getBannerList({commit}) {
        let result = await reqBannerList()
        
        if(result.code==200){
            //如果成功，更新数据
            commit('GETBANNERLIST', result.data)
        }
    },
    //使用接口向mock接口请求floor数据
    async getFloorList({commit}) {
        let result = await reqFloorList()
        
        if(result.code==200){
            //如果成功，更新数据
            commit('GETFLOORLIST', result.data)
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