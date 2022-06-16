//對於axios進行二次封裝
import axios from "axios"
//引入进度条
import nprogress from "nprogress"
import "nprogress/nprogress.css"
//在当前模块中引入store
import store from '@/store'
//1. 创建axios实例
const requests = axios.create({
    //基础路径(此处的ip和端口是nginx服务器上的地址，由nginx服务代理了本该访问的后端地址)
    baseURL: "http://101.34.217.240:8080/api",
    //请求超时的时间5s
    timeout: 5000

})

//请求拦截器：在发请求之前，请求拦截器可以检测到

requests.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //需要携带token给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
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