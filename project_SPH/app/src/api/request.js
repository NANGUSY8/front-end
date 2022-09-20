//二次封装axios
//引入
import axios from 'axios'
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"
//引入仓库
import store from '@/store'
//创建axios实例
const requests = axios.create({
    //基础路径，发送请求时默认路径会添加
    baseURL: '/api',
    //请求超时时间
    timeout: 5000,
})

//设置请求拦截器
requests.interceptors.request.use((config) => {
    //判断是否有uuid
    if (store.state.detail.uuid_token) {
        //设置请求头
        config.headers.userTempId = store.state.detail.uuid_token
        //    console.log(config.headers.userTempId)
    }
    //判断是否有token
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    //进度条开始
    nprogress.start()
    //配置对象:里面的header属性很重要
    return config
})

//设置响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数
    //进度条结束
    nprogress.done()
    return res.data
}, (err) => {
    //失败的回调函数
    return Promise.reject(new Error('faile'))
})

//向外默认暴露
export default requests