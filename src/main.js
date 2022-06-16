import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from "@/router"
//引入仓库
import store from '@/store'
//三级联动组件(全局)
import TypeNav from "@/components/TypeNav"
import { reqCategoryList, reqGetSearchInfo } from "@/api"
import "@/mock/mockServe"
//全局轮播样式
import Carousel from "@/components/Carousel"
//引入swiper样式
import 'swiper/css/swiper.min.css'
//引入全局分页
import Pagination from "@/components/Pagination"

import VueLazyload from 'vue-lazyload'
import errimg from "@/assets/th.png"

//ElementUI按需引入
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

reqCategoryList()
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false

Vue.use(VueLazyload, {
    loading: errimg,
})

//引入校验插件(不需要暴露，执行即可)
import "@/plugins/validate"
new Vue({
    render: h => h(App),
    //注册路由
    router,
    //注册仓库
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
    },
}).$mount('#app')