//管理登录与注册的仓库

//引入接口
import {
    reqCode,
    reqRegister
} from '@/api'

//数据
const state = {
   code:""
}
//更新数据
const mutations = {
    GETCODE(state, code) {
        state.code = code
    }
}
//用户的动作
const actions = {
    //获取验证码
    async getCodeByPhone({commit},phone){
        let result = await reqCode(phone)
        if (result.code == 200) {
            //成功,提交mutations修改数据
            commit("GETCODE", result.data)
        }else {
            //失败
            return Promise.reject(new Error("faile")) 
        }
    },
    //注册用户
    async getRegister({commit},data){
        let result = await reqRegister(data)
        console.log(result);
        if (result.code == 200) {
            //成功,服务器不用返回数据
            return "ok"
        }else {
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