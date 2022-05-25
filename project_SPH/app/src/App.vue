<template>
  <div>
    <MyHeader></MyHeader>
    <!-- 路由组件出口 -->
    <router-view ></router-view>
    <MyFooter></MyFooter>
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
