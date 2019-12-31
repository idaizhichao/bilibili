<template>
  <div class="pagination">
    <div>
      <a class="pre " v-show="current !== 1" @click="handleCurrent(current - 1)"
        >上一页</a
      >
      <a
        @click="handleCurrent(item === 0 ? undefined : item)"
        :class="
          `${current === item ? 'ckeck-item' : ''} ${
            item ? ' number' : 'ellipsis'
          }`
        "
        v-for="item in lists"
        :key="item"
        v-text="item ? item : '...'"
      />
      <a
        class="pre "
        v-show="current !== this.pageTotle"
        @click="handleCurrent(current + 1)"
        >下一页</a
      >
    </div>
    <div class="skip">
      <span>共{{ pageTotle }}页，跳转至</span
      ><input type="text" class="p-input" v-model="skip" />页
      <button class="p-button" @click="handleButtonClick">
        提交
      </button>
    </div>
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
      if (this.pageTotle < 6) {
        let result = [];
        for (let i = 0; i < this.pageTotle; i++) {
          result.push(i + 1);
        }
        return result;
      }
      if (this.current < 5) {
        return [1, 2, 3, 4, 5, 6, undefined, this.pageTotle];
      }
      if (this.current >= 5 && this.current < this.pageTotle - 2) {
        return [
          1,
          0,
          this.current - 2,
          this.current - 1,
          this.current,
          this.current + 1,
          this.current + 2,
          undefined,
          this.pageTotle
        ];
      }
      // 当前 curren
      return [
        1,
        0,
        this.pageTotle - 3,
        this.pageTotle - 2,
        this.pageTotle - 1,
        this.pageTotle
      ];
    }
  },
  data() {
    return {
      current: 1,
      skip: undefined
    };
  },
  methods: {
    handleCurrent(item) {
      if (item) {
        this.current = item;
        this.$emit("change", item);
      }
    },
    handleButtonClick() {
      if (this.skip)
        this.current = isNaN(parseInt(this.skip)) ? 1 : parseInt(this.skip);
      else if (this.skip < 0 || this.skip > this.pageTotle)
        this.current = this.pageTotle;
      else this.current = 1;
      this.$emit("change", this.current);
      this.skip = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.skip {
  color: #a9a9a9;
}
.p-input {
  margin: 0 4px;
  padding: 0 10px;
  box-sizing: border-box;
  width: 46px;
  border-radius: 4px;
  height: 24px;
  color: #a9a9a9;
  border: 1px solid #e9e9e9;
}
.p-button {
  color: white;
  font-size: 14px;
  width: 46px;
  height: 26px;
  background-color: #00a1d6;
  border: 1px solid #00a1d6;
  border-radius: 4px;
  cursor: pointer;
}
.ellipsis {
  padding: 5px;
}
</style>
