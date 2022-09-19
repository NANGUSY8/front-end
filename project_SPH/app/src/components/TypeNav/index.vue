<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- 事件委托|事件委派 -->
    <div class="container" @mouseleave="leaveIndex" @mouseenter="showList">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 一级分类,添加过渡动画效果 -->
      <transition name="sort">
        <div class="sort" v-show="isShow">
          <!-- 利用事件委派+编程式导航完成路由的跳转 -->
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="(c1, index) in categoryList.slice(0, 16)"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <!-- 自定义属性以data-开头才能使用dataset属性 -->
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 二级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <!-- 三级分类 -->
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  mounted() {
    //路径是首页，则显示三级联动菜单
    if (this.$route.path == "/home") {
      this.isShow = true;
    }

    // if(this.$route.)
  },
  data() {
    return {
      //标记当前鼠标移入的一级分类的索引值
      currentIndex: -1,
      //标记商品分类导航是否展示
      isShow: false,
    };
  },
  methods: {
    //当鼠标移入一级分类时，改变currentIndex值为当前的元素的index值
    changeIndex: throttle(function (index) {
      this.currentIndex = index; //this为vc对象,执行时绑定的
    }, 50),
    //鼠标移除一级分类时
    leaveIndex() {
      //不改变背景颜色
      this.currentIndex = -1;
      //不是home页面时:隐藏三级联动菜单
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },
    //鼠标点击时三级联动菜单时
    goSearch(event) {
      //得到自定义属性,html不识别大小写，所以返回的属性名是小写的
      const { categoryname, category1id, category2id, category3id } =
        event.target.dataset;

      if (categoryname) {
        //存在该属性，说明是点击的是a标签
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          //点击的是一级分类
          query.category1Id = category1id;
        } else if (category2id) {
          //点击的是二级分类
          query.category2Id = category2id;
        } else {
          //点击的是三级分类
          query.category3Id = category3id;
        }
        //整理参数
        location.query = query;
        //合并params参数
        location.params = this.$route.params;

        //跳转到搜索路由
        this.$router.push(location);
      }
    },
    //不是home页面时:当鼠标移入商品分类时，展示三级联动菜单
    showList() {
      if (this.$route.path != "/home") {
        this.isShow = true;
      }
    },
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  a{
    cursor: pointer;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 29px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    //进入的起点，离开的终点
    .sort-enter,
    .sort-leave-to {
      // height: 0px;
      opacity: 0;
    }

    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.3s linear;
      overflow: hidden;
    }

    //进入的终点，离开的起点
    .sort-enter-to,
    .sort-leave {
      // height: 461px;
      opacity: 1;
    }
  }
}
</style>