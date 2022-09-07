//二次封装axios
//引入
import axios from 'axios'
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"

//创建axios实例
const mockRequests = axios.create({
    //基础路径，发送请求时默认路径会添加
    baseURL: '/mock',
    //请求超时时间
    timeout: 5000,
})

//设置请求拦截器
mockRequests.interceptors.request.use((config) => {
    //进度条开始
    nprogress.start()
    return config
})

//设置响应拦截器
mockRequests.interceptors.response.use((res) => {
    //成功的回调函数
    //进度条结束
    nprogress.done()
    return res.data
}, (err) => {
    //失败的回调函数
    return Promise.reject(new Error('fail'))
})

//向外默认暴露
export default mockRequests