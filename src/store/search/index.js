import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
import { reqGetSearchInfo } from "@/api"
export default {
    namespaced: true,
    state: {
        searchList: {}
    },
    actions: {
        //获取search模块数据
        async getSearchList(context, params = {}) {
            let results = await reqGetSearchInfo(params)
            if (results.code == 200) {
                context.commit("GETSEARCHLIST", results.data)
            }
        }
    },

    //修改state打的唯一手段
    mutations: {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList
        }
    },
    getters: {
        goodsList(state) {
            return state.searchList.goodsList || []
        },
        attrsList(state) {
            return state.searchList.attrsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        }
    }
}