<template>
  <div class="pagination">
    <a class="pre " v-show="current !== 1" @click="handleCurrent(current - 1)"
      >上一页</a
    >
    <a
      @click="handleCurrent(item)"
      :class="'number ' + (current === item ? 'ckeck-item' : '')"
      v-for="item in lists"
      :key="item"
      >{{ item }}</a
    >
    <a
      @click="handleCurrent(pageTotle)"
      :class="'number ' + (current === pageTotle ? 'ckeck-item' : '')"
      >{{ pageTotle }}</a
    >
    <a
      class="next"
      v-show="current !== pageTotle"
      @click="handleCurrent(current + 1)"
      >下一页</a
    >
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totle: {
      type: Number,
      default: 0,
      required: true
    },
    pageSize: {
      type: Number,
      default: 20
    }
  },
  computed: {
    pageTotle() {
      if (!this.totle) return 0;
      return Math.ceil(this.totle / this.pageSize);
    },
    lists() {
      return new Array(this.totle);
    }
  },
  data() {
    return {
      current: 1
    };
  },
  methods: {
    handleCurrent(item) {
      this.current = item;
      this.$emit("change", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  .number,
  .pre,
  .next {
    margin: 0 3px;
    border: 1px solid #e9e9e9;
    padding: 0 10px;
    height: 38px;
    line-height: 38px;
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    border-radius: 1px;
    transition: all 0.2s;
    border-radius: 4px;
    min-width: 38px;
  }
  .pre,
  .next {
    padding: 0 15px;
  }
  .ckeck-item {
    border: 1px solid #00a1d6 !important;
    background-color: #00a1d6;
    a {
      color: white;
    }
  }
}
</style>
