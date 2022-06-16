//對於axios進行二次封裝
import axios from "axios"
//引入进度条
import nprogress from "nprogress"
import "nprogress/nprogress.css"

//1. 创建axios实例
const requests = axios.create({
    //基础路径
    baseURL: "/mock",
    //请求超时的时间5s
    timeout: 5000

})

//请求拦截器：在发请求之前，请求拦截器可以检测到

requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个属性很重要，headers请求头
    nprogress.start()
    return config
})
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应的数据回来以后，响应拦截器可以检测到
    nprogress.done()
    return res.data
}, (err) => {
    //响应失败的回调函数
    return Promise.reject(new Error('fail'))
})

export default requests