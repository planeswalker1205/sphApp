import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
import { getUUID } from "@/utils/uuid_token"
export default {
    namespaced: true,
    state: {
        goodInfo: {},
        uuid_token: getUUID()
    },
    actions: {
        //获取产品信息
        async getGoodsInfo(context, skuId) {
            let results = await reqGoodsInfo(skuId)
            if (results.code == 200) {
                context.commit("GETGOODSINFO", results.data)
            }
        },

        //将产品添加到购物车
        async addOrUpdateShopCart(context, { skuId, skuNum }) {
            //服务器写入数据成功，并没有返回其他数据，只是返回code=200，代表本次操作成功
            let results = await reqAddOrUpdateShopCart(skuId, skuNum)
            if (results.code == 200) {
                return "ok"
            } else {
                return Promise.reject(new Error("faile"))
            }
        }
    },
    //修改state打的唯一手段
    mutations: {
        GETGOODSINFO(state, goodInfo) {
            state.goodInfo = goodInfo
        }
    },
    getters: {
        categoryView(state) {
            return state.goodInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.goodInfo.skuInfo || {}
        },
        //产品售卖属性的简化
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || []
        }
    }
}