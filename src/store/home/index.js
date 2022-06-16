import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"
export default {
    namespaced: true,
    state: {
        categoryList: [],
        bannerlist: [],
        floorlist: []
    },
    actions: {
        //获取三级联动菜单数据
        async categoryList(context) {
            let result = await reqCategoryList()
            if (result.code == 200) {
                context.commit("CATEGORYLIST", result.data)
            }
        },
        //获取首页轮播图数据
        async getBannerList(context) {
            let results = await reqGetBannerList()
            if (results.code == 200) {
                context.commit("GETBANNERLIST", results.data)
            }

        },
        async getFloorList(context) {
            let results = await reqFloorList()
            if (results.code == 200) {
                context.commit("GETFLOORLIST", results.data)
            }
        }
    },

    //修改state打的唯一手段
    mutations: {
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList
        },
        GETBANNERLIST(state, bannerlist) {
            state.bannerlist = bannerlist

        },
        GETFLOORLIST(state, floorlist) {
            state.floorlist = floorlist
        }
    },
    getters: {

    }
}