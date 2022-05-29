<template>
  <div>
    <MyHeader></MyHeader>
    <!-- 路由组件出口 -->
    <router-view ></router-view>
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'

export default {
  name: 'App',
  components: {
    MyHeader, MyFooter
  },
  mounted() {
  //挂载完毕，通知Vuex向服务器发送请求,获取商品列表数据
    this.$store.dispatch('home/getCategoryList', 'getCategoryList')
    //通知Vuex从mock接口获取轮播图的模拟数据
    this.$store.dispatch('home/getBannerList', 'getBannerList')
  },
  
}
</script>

<style>
</style>
