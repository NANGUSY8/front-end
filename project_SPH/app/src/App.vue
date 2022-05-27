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
  }
}
</script>

<style>
</style>
