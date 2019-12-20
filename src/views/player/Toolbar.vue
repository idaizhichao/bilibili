<template>
  <div>
    <div class="toolbar">
      <div class="ops">
        <div class="ops-item">
          <i class="iconfont">&#xe6e0;</i>
          <span>{{ stat.like | number }}</span>
        </div>
        <div class="ops-item">
          <i class="iconfont">&#xe667;</i>
          <span>{{ stat.coin | number }}</span>
        </div>
        <div class="ops-item">
          <i class="iconfont">&#xe6ca;</i>
          <span>{{ stat.favorite | number }}</span>
        </div>
        <div class="ops-item">
          <i class="iconfont">&#xe627;</i>
          <span>{{ stat.share | number }}</span>
        </div>
      </div>
      <div class="appeal">
        稿件投诉
      </div>
    </div>
    <div class="desc">
      <div class="info" v-html="transilation(videoDes)"></div>
      <!-- <div class="desc-btn">
        <span>收起</span>
      </div> -->
    </div>
    <div class="tag">
      <div class="tag-item" v-for="item in videoTag" :key="item.tag_id">
        {{ item.tag_name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    stat: {
      type: Object,
      default: () => {
        return {
          like: 0,
          coin: 0,
          favorite: 0,
          share: 0
        };
      }
    },
    videoTag: {
      type: Array,
      default: () => []
    },
    videoDes: {
      type: String,
      default: ""
    }
  },
  methods: {
    transilation(value) {
      let exp = /['\n']/g;
      let x = value.replace(exp, "<br/>");
      return x;
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar,
.tag {
  margin-top: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e9ef;
  display: flex;
}
.ops {
  display: flex;
  align-items: center;
  height: 30px;
  flex: 1;
  .ops-item {
    width: 90px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #00a1d6;
      i {
        color: #00a1d6;
      }
    }
  }
  span {
    width: 90px;
    font-size: 16px;
  }
  i {
    vertical-align: sub;
    font-size: 28px;
    margin-right: 5px;
    color: #757575;
  }
}
.appeal {
  margin-right: 7px;
  line-height: 30px;
  height: 30px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: #00a1d6;
  }
}
.desc {
  margin-top: 20px;
  .info {
    height: auto;
    overflow: hidden;
    transition: all 0.3s;
  }
  .desc-btn {
    margin-top: 12px;
    line-height: 18px;
    span {
      cursor: pointer;
      color: #505050;
      transition: all 0.3s;

      &:hover {
        color: #00a1d6;
      }
    }
  }
}
.tag {
  .tag-item {
    height: 22px;
    line-height: 22px;
    border: 1px solid #f4f4f4;
    background-color: #f4f4f4;
    margin: 0 10px 8px 0;
    padding: 0 12px;
    color: #505050;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      border: 1px solid #00a1d6;
      color: #00a1d6;
    }
  }
}
</style>
