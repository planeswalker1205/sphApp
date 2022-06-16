//配置路由文件
import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
import store from "@/store"

// 解决导航栏中的vue-router在3.0版本以上重复点菜单报错问题

let originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
let router = new VueRouter({
    routes: [{
            path: '/center',
            name: 'center',
            component: () =>
                import ("@/pages/Center"),
            meta: { showFooter: true },
            //二级路由
            children: [{
                    path: 'myorder',
                    component: () =>
                        import ("@/pages/Center/MyOrder")
                }, {
                    path: 'grouporder',
                    component: () =>
                        import ("@/pages/Center/GroupOrder")
                },
                {
                    path: "/center",
                    redirect: "myorder"
                }
            ]
        }, {
            path: '/paysuccess',
            name: 'paysuccess',
            component: () =>
                import ("@/pages/PaySuccess"),
            meta: { showFooter: true }
        }, {
            path: '/pay',
            name: 'pay',
            component: () =>
                import ("@/pages/Pay"),
            meta: { showFooter: true },
            beforeEnter: (to, from, next) => {
                if (from.path == "/trade") {
                    next()
                } else {
                    next(false)
                }
            }
        }, {
            path: '/trade',
            name: 'trade',
            component: () =>
                import ("@/pages/Trade"),
            meta: { showFooter: true },
            beforeEnter: (to, from, next) => {
                if (from.path == "/ShopCart") {
                    next()
                } else {
                    next(false)
                }
            }
        }, {
            path: '/ShopCart',
            name: 'ShopCart',
            component: () =>
                import ("@/pages/ShopCart"),
            meta: { showFooter: true }
        }, {
            path: '/addcartsuccess',
            name: 'addcartsuccess',
            component: () =>
                import ("@/pages/AddCartSuccess"),
            meta: { showFooter: true }
        }, {
            path: '/detail/:skuId',
            component: () =>
                import ("@/pages/Detail"),
            meta: { showFooter: true }
        }, {
            path: '/home',
            //路由懒加载。当路由被访问的时候才加载对应组件，更加高效
            component: () =>
                import ('@/pages/Home'),
            meta: { showFooter: true }
        },
        {
            path: '/login',
            component: () =>
                import ("@/pages/Login"),
            meta: { showFooter: false }
        },
        {
            path: '/register',
            component: () =>
                import ("@/pages/Register"),
            meta: { showFooter: false }
        },
        {
            name: "search",
            path: "/search/:keyword?",
            component: () =>
                import ("@/pages/Search"),
            meta: { showFooter: true }
        },
        //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        {
            path: '*',
            redirect: "/home",
            meta: { showFooter: false }
        }
    ],
    //控制滚动条行为，路由跳转后滚动条在最上方
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

//全局守卫
router.beforeEach(async(to, from, next) => {
    //用户登录了，才会有token，未登录一定不会有token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        //如果用户已经登录还要去登录界面，直接跳转到home
        if (to.path == "/login") {
            next('/home')
        } else {
            //登录了，但是去的不是登录界面
            if (name) {
                next()
            } else {
                //要跳转的路由没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    await store.dispatch("user/getUserInfo")
                    next()
                } catch (error) {
                    //token失效,清除token
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    } else {
        //未登录:不能去交易相关，支付相关，个人中心
        let toPath = to.path
        if (toPath.indexOf("/trade") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
            next("/login?redirect=" + toPath)
        } else {
            next()
        }

    }

})

export default router