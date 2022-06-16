<template>
  <div id="app">

    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>

    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted() {
    //派发一个action//获取商品分类的三级列表数据
    //通知Vuex发请求，获取数据，存储在仓库中-
    this.$store.dispatch("home/categoryList");
  },
}
</script>

<style>

</style>
