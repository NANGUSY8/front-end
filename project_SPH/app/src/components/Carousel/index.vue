<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
    name:"Carousel",
    props:["list"],
    watch: {
        //保证数据存在+结构存在，实现轮播效果
        list: {
            //因为 floor的轮播是父组件传的数据,数据没有发生变化,所以让初始化时执行一次监听
            immediate:true,
            handler(newValue, oldValue) {
                this.$nextTick(() => {
                    //如果还没有数据,返回
                    if(!this.list.length) return;
                    new Swiper('.swiper-container', {
                        loop: true, // 循环模式选项
                        autoplay: true,

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true //点击小圆可以切换
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }
                    })
                })
            }
        }
    }
}

</script>

<style>
</style>