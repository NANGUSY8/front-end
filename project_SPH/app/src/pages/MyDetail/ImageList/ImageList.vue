<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"   
        @click="changeIndex(index)"
      >
        <img :src="skuImage.imgUrl" :class="{ active: curIndex == index }"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      curIndex: 0,
    };
  },
  methods: {
    changeIndex(index) {
      this.curIndex = index;
      //通知兄弟组件放大镜改变curIndex值
      this.$bus.$emit("changeIndex", index);
    },
  },
  watch: {
    //保证数据存在+结构存在，实现轮播效果
    skuImageList: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          //如果还没有数据,返回
          if (!this.skuImageList.length) return;
          new Swiper(".swiper-container", {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //每一次显示几个图片
            slidesPerView: 3,
            //一次切换多少个图片
            slidesPerGroup: 1,
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #ba3d54;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #ba3d54;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>