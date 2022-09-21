<template>
  <div class="pagination">
    <button
      @click="$emit('getPageNo', pageNo - 1)"
      :disabled="pageNo == 1"
    >
      上一页
    </button>
    <button @click="$emit('getPageNo', 1)" v-if="paginationParams.start > 1">
      1
    </button>
    <button v-if="paginationParams.start > 2">···</button>

    <template v-if="pageFor.length > 0">
      <button
        v-for="(page, index) in pageFor"
        :key="index"
        @click="$emit('getPageNo', page)"
        :class="{ active: pageNo === page }"
      >
        {{ page }}
      </button>
    </template>

    <button v-if="paginationParams.end < totalPages -1 ">···</button>
    <button
      v-if="paginationParams.end < totalPages"
      @click="$emit('getPageNo', totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      @click="$emit('getPageNo', pageNo + 1)"
      :disabled="pageNo == totalPages"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
  <script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues", "totalPages"],
  data() {
    return {};
  },
  computed: {
    paginationParams() {
      let start = 0,
        end = 0;
      let { pageNo, continues, totalPages } = this;

      //非正常情况:如果当前页大于总页数
      if(continues>totalPages){
        start=1
        end=totalPages
      }
      // else if (pageNo > totalPages) {
      //   pageNo = totalPages;
      //   end = totalPages;
      //   start = totalPages - continues + 1;
      // } 
      else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPages) {
          start = pageNo - continues + 1;
          end = totalPages;
        }
      }
      return { start, end };
    },
    //计算v-for的循环数组[start-end]
    pageFor() {
      let forArr = [];
      let { start, end } = this.paginationParams;
      for (let i = start; i <= end; i++) {
        forArr.push(i);
      }
      return forArr;
    },
  },
};
</script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
  