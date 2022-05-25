<template>
  <div>
    <MyHeader></MyHeader>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader/MyHeader.vue'
import MyFooter from './components/MyFooter/MyFooter.vue'

export default {
  name: 'App',
  components: {
    MyHeader, MyFooter
  }
}
</script>

<style>
</style>
