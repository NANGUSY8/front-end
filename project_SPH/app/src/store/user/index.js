//管理登录与注册的仓库

//引入接口
import {
    reqCode,
    reqLogin,
    reqLoginOut,
    reqRegister,
    reqUserInfo
} from '@/api'

import { getToken, setToken, removeToken } from "@/utils/token"
//数据
const state = {
    code: "",
    token: getToken(),
    userInfo: {}
}
//更新数据
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    GETLOGIN(state, token) {
        state.token = token
    },
    GETUSERLOGININFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清除数据
    CLEAR(state){
        state.token=""
        state.userInfo={}
        //清除本地存储
        removeToken()
    }
}
//用户的动作
const actions = {
    //获取验证码
    async getCodeByPhone({ commit }, phone) {
        let result = await reqCode(phone)
        if (result.code == 200) {
            //成功,提交mutations修改数据
            commit("GETCODE", result.data)
        } else {
            //失败
            return Promise.reject(new Error("faile"))
        }
    },
    //注册用户
    async getRegister({ commit }, data) {
        let result = await reqRegister(data)
        // console.log(result);
        if (result.code == 200) {
            //成功,服务器不用返回数据
            return "ok"
        } else {
            //失败
            return Promise.reject(new Error("faile"))
        }
    },
    //登录
    async getLogin({ commit }, data) {
        let result = await reqLogin(data)
        // console.log(result);
        if (result.code == 200) {
            //成功,服务器返回token
            commit("GETLOGIN", result.data.token)
            // console.log(result.data.token);
            //本地存储一份
            setToken(result.data.token)
            
        } else {
            //失败
            return Promise.reject(new Error("faile"))
        }
    },
    //获取用户登录信息
    async getUserLoginInfo({ commit }) {
        let result = await reqUserInfo()
        // console.log(result);
        if (result.code == 200) {
            //成功,服务器返回用户数据
            commit("GETUSERLOGININFO", result.data)

        } else {
            //失败
            return Promise.reject(new Error("faile"))
        }
    },
    //退出登录
    async getLoginOut({ commit }) {
        let result = await reqLoginOut()
        // console.log(result);
        if (result.code == 200) {
            //成功,清除token
            commit("CLEAR")
        } else {
            //失败
            return Promise.reject(new Error("faile"))
        }
    },

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