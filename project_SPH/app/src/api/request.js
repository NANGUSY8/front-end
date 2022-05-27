//二次封装axios
//引入
import axios from 'axios'


//创建axios实例
const requests = axios.create({
    //基础路径，默认添加
    baseURL: '/api',
    //请求超时时间
    timeout: 5000,
})

//设置请求拦截器
requests.interceptors.request.use((config) => {
    return config
})

//设置响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数
    return res.data
}, (err) => {
    //失败的回调函数
    return Promise.reject(new Error('fail'))
})

//向外默认暴露
export default requests