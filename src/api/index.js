//API进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest"
//三级联动接口

export const reqCategoryList = () => {
    return requests({ url: "/product/getBaseCategoryList", methods: "get" })
}

//获取banner(home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = () => mockRequests.get("/floor")

//获取搜索模块数据
export const reqGetSearchInfo = (params) => {
    return requests({
        url: "/list",
        method: 'post',
        data: params
    })
}

//获取产品详情信息接口
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" })

//将产品添加到购物车中或者更新某一个产品的个数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })

//获取购物车列表数据接口
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改商品的选中状态
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册请求
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })

//登录
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })


//获取用户信息【需要带着用户token像服务器要用户信息】

export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

//退出登录
export const reqLogout = () => requests({ url: "/user/passport/logout", method: 'get' })

//獲取用戶地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//获取商品清单
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

//提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

//获取支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取支付订单状态
export const reqPaystatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

//获取个人中心数据
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })