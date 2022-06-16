<template>
  <div>
    <!-- 三级联动 -->
    <TypeNav />
    <ListContainer />
    <!-- 今日推荐 -->
    <ReCommend />
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <Floor v-for="(floor) in floorlist" :key = "floor.id" :list = "floor"/>
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer"
import ReCommend from "@/pages/Home/ReCommend"
import Rank from "@/pages/Home/Rank"
import Like from "@/pages/Home/Like"
import Floor from "@/pages/Home/Floor"
import Brand from "@/pages/Home/Brand"
import { mapState } from 'vuex'
export default {
  name:"Home",
  components:{ListContainer,ReCommend,Rank,Like,Floor,Brand},
  mounted() {
    //派发action，获取floor组件的数据
    this.$store.dispatch("home/getFloorList");

  },
  computed:{
    ...mapState("home",["floorlist"])
  }
}
</script>

<style>

</style>