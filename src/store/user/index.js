//登录与注册模块

import Vuex from "vuex"
import Vue from "vue"
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken } from "@/utils/token"
Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        code: '',
        token: localStorage.getItem("TOKEN"),
        userInfo: {}
    },
    actions: {
        //获取验证码
        async getCode(context, phone) {
            let result = await reqGetCode(phone)
            if (result.code == 200) {
                context.commit("GETCODE", result.data)
                return "ok"
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //用户注册
        async userRegister({ commit }, user) {
            let result = await reqUserRegister(user)
            if (result.code == 200) {
                return "ok"
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        async userLogin({ commit }, data) {
            let result = await reqUserLogin(data)

            //服务器下发token，用户唯一标识符
            if (result.code == 200) {
                commit("USERLOGIN", result.data.token)

                //持久化存储token
                setToken(result.data.token)
                return "ok"
            } else {
                return Promise.reject(new Error('fail'))
            }

        },
        async getUserInfo({ commit }) {
            let result = await reqUserInfo()
            if (result.code == 200) {
                commit("GETUSERINFO", result.data)
                return "ok"

            } else {
                return Promise.reject(new Error('fail'))
            }
        },
        async userLogout({ commit }) {
            let result = await reqLogout()
            if (result.code == 200) {
                commit("CLEARUSERINFO")
                return "ok"
            } else {
                return Promise.reject(new Error('fail'))
            }
        }

    },
    //修改state打的唯一手段
    mutations: {
        GETCODE(state, code) {
            state.code = code
        },
        USERLOGIN(state, token) {
            state.token = token
        },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        CLEARUSERINFO(state) {
            state.token = ''
            state.userInfo = {}
            localStorage.removeItem("TOKEN")
        }
    },
    getters: {}
}