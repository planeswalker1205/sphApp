import Vuex from "vuex"
import Vue from "vue"
import { reqAddressInfo, reqOrderInfo } from "@/api"
Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        address: [],
        orderInfo: {}
    },
    actions: {
        //獲取用戶地址信息
        async getUserAddress({ commit }) {
            let result = await reqAddressInfo()
            if (result.code == 200) {
                commit("GETUSERADDRESS", result.data)
            }
        },
        //获取商品清单数据
        async getOrderInfo({ commit }) {
            let result = await reqOrderInfo()
            if (result.code == 200) {
                commit("GETORDERINFO", result.data)

            }
        }
    },
    //修改state打的唯一手段
    mutations: {
        GETUSERADDRESS(state, address) {
            state.address = address
        },
        GETORDERINFO(state, orderInfo) {
            state.orderInfo = orderInfo
        }
    },
    getters: {}
}