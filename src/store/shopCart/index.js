import Vuex from "vuex"
import Vue from "vue"
import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api"
Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        cartList: []
    },
    actions: {
        //获取购物车列表数据
        async getCartList(context) {
            let results = await reqCartList()

            if (results.code == 200) {
                context.commit("GETCARTLIST", results.data)
            }
        },
        //删除购物车某一个产品
        async deleteCartListBySkuId(context, skuId) {
            let result = await reqDeleteCartById(skuId)
            if (result.code == 200) {
                return "ok"
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //修改购物车某一个产品的选中状态
        async reqUpdateCheckedByid(context, { skuId, isChecked }) {
            let result = await reqUpdateCheckedByid(skuId, isChecked)
            if (result.code == 200) {
                return "ok"
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //刪除全部選中的商品
        deleteAllCheckedCart(context) {
            let PromiseAll = []
            context.getters.carList.cartInfoList.forEach(element => {
                let promise = element.isChecked == 1 ? context.dispatch('deleteCartListBySkuId', element.skuId) : ''

                //将每一次返回的promise添加到数组中
                PromiseAll.push(promise)
            });
            //只要全部的p1|p2...都成功，返回的结果就是成功，如果有一个失败，返回即为失败结果
            return Promise.all(PromiseAll)
        },
        //修改全部产品的状态
        updateAllCartChecked({ dispatch, state }, isChecked) {
            let promiseAll = []
            state.cartList[0].cartInfoList.forEach(item => {
                let promise = dispatch("reqUpdateCheckedByid", { skuId: item.skuId, isChecked })
                promiseAll.push(promise)
            })
            return Promise.all(promiseAll)
        }

    },
    //修改state打的唯一手段
    mutations: {
        GETCARTLIST(state, cartList) {
            state.cartList = cartList
        }
    },
    getters: {
        carList(state) {
            return state.cartList[0] || {}
        }
    }
}