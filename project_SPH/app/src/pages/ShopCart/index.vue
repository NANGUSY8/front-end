<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked === 1"
              @click="updateChecked(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', -1, cartInfo)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value, cartInfo)"
            />
            <a class="plus" @click="handler('plus', 1, cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum"
              >{{ cartInfo.skuPrice * cartInfo.skuNum }}.00</span
            >
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckedAll && cartInfoList.length > 0"
          @click="updateCheckedAll($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） :</em>
          <i class="summoney">{{ sumPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//引入节流
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },

  computed: {
    ...mapGetters("shopcart", ["cartList"]),
    //简化购物车信息列表
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //判断是否全选
    isCheckedAll() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
    //计算全部商品的总价
    sumPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuPrice * item.skuNum;
        }
      });
      return sum.toFixed(2);
    },
  },
  methods: {
    //发送请求
    getData() {
      this.$store.dispatch("shopcart/getCartList");
    },

    //产品数量操作+节流,type:区分谁点 disNum:差值(1,-1,输入值),cartInfo:区分谁
    handler: throttle(async function (type, disNum, cartInfo) {
      switch (type) {
        case "minus":
          disNum = cartInfo.skuNum > 0 ? -1 : 0;
          break;
        case "plus":
          disNum = 1;
          break;
        case "change":
          //判断是否非法.是:为0,不是:获取差值
          disNum = isNaN(disNum) || disNum < 0 ? 0 : disNum - cartInfo.skuNum;
      }
      //给服务器发送异步请求
      await this.$store
        .dispatch("detail/postShopCartInfo", {
          skuid: cartInfo.skuId,
          skuNum: disNum,
        })
        .then(() => {
          //成功,获取购物车最新数据展示
          this.getData();
        })
        .catch((err) => {
          //失败
          alert(err.message);
        });
    }, 500),

    //产品删除操作
    async deleteCart(skuId) {
      //发送异步请求
      await this.$store
        .dispatch("shopcart/deleteCartById", skuId)
        .then(() => {
          //删除成功,获取购物车最新数据展示
          this.getData();
        })
        .catch((err) => {
          //失败
          alert(err.message);
        });
    },

    //产品状态勾选操作
    async updateChecked(cartInfo, event) {
      //判断isChecked
      let isChecked = event.target.checked ? "1" : "0";
      //发送异步请求
      await this.$store
        .dispatch("shopcart/updateCheckedById", {
          skuId: cartInfo.skuId,
          isChecked: isChecked,
        })
        .then(() => {
          //删除成功,获取购物车最新数据展示
          this.getData();
        })
        .catch((err) => {
          //失败
          alert(err.message);
        });
    },

    //删除选中的产品
    async deleteCheckedCart() {
      await this.$store
        .dispatch("shopcart/deleteCheckedCart")
        .then(() => {
          //删除成功,获取购物车最新数据展示
          this.getData();
        })
        .catch((err) => {
          //失败
          alert(err.message);
        });
    },

    //更新全选的状态
    async updateCheckedAll(event) {
      let isChecked = event.target.checked ? "1" : "0";
      await this.$store
        .dispatch("shopcart/updateCheckedAll", isChecked)
        .then(() => {
          //更新成功,获取购物车最新数据展示
          this.getData();
        })
        .catch((err) => {
          //失败
          alert(err.message);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>