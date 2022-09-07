<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor/>
    <Floor/>
    <Brand/>
  </div>
</template>

<script>
//引入组件
import ListContainer from '@/pages/MyHome/ListContainer'
import TodayRecommend from '@/pages/MyHome/TodayRecommend'
import Rank from '@/pages/MyHome/Rank'
import Like from '@/pages/MyHome/Like'
import Floor from '@/pages/MyHome/Floor'
import Brand from '@/pages/MyHome/Brand'


export default {
  name: 'MyHome',
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    //通知Vuex从mock接口获取floor的模拟数据
    this.$store.dispatch('home/getFloorList', 'getFloorList')
  }
}
</script>

<style lang="less" scoped>
</style>