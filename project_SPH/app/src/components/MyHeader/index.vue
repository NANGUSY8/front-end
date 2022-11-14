<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>购物商城欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-if="userName">
            <span>{{ userName }}</span>
            <a class="register" @click="loginOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">个人中心</a>
          <a href="###">会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注购物商城</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "MyHeader",
  mounted() {
    this.$bus.$on("delKeyword", () => {
      this.keyword = "";
    });
  },
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    //用户信息
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
  methods: {
    //点击搜索按钮，跳转到搜素页面
    goSearch() {
      //合并参数
      //   this.$route.params.keyword = this.keyword || undefined
      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
        query: this.$route.query,
      };
      //   this.$route.params.keyword = this.keyword
      this.$router.push(location);
      //   console.log(location);
      //   console.log(this.$route.params);
    },
    //退出登录操作
    async loginOut() {
      await this.$store
        .dispatch("user/getLoginOut")
        .then(() => {
          //成功跳转到首页
          this.$router.push("/home");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;
          cursor: pointer;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }

          a:hover {
            color: #ba3d54;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ba3d54;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ba3d54;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>