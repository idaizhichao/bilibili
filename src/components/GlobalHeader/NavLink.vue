<template>
  <div>
    <div :class="'wrapper ' + 'wrapper-' + [this.device]">
      <div class="item" v-for="item in navList" :key="item.title">
        <a :href="item.toPath" @mouseenter="handleMouseenter()">
          <i class="iconfont" v-if="item.icon" v-html="item.icon"></i
          >{{ item.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { AppDeviceEnquire, mixinDevice } from "@/utils/mixin";
const navList = [
  {
    title: "主站",
    icon: "&#xe75c;",
    toPath: "/"
  },
  {
    title: "番剧",
    toPath: "#"
  },
  {
    title: "游戏中心",
    toPath: "#"
  },
  {
    title: "直播",
    toPath: "#"
  },
  {
    title: "会员购",
    toPath: "#"
  },
  {
    title: "漫画",
    toPath: "#"
  },
  {
    title: "赛事",
    toPath: "#"
  },
  {
    title: "BML",
    toPath: "#"
  },
  {
    title: "下载APP",
    icon: "&#xe630;",
    toPath: "#"
  }
];
export default {
  name: "NavLink",
  mixins: [AppDeviceEnquire, mixinDevice],
  data() {
    return {
      navList
    };
  },
  methods: {
    handleMouseenter() {
      console.log("我进来了");
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-tablet,
.wrapper-mobile {
  min-width: 451px;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  height: 36px;
  .item {
    margin-left: 10px;
    font-size: 14px;
    line-height: 36px;
    height: 36px;
    a {
      color: white;
    }
  }
  .iconfont {
    margin-right: 3px;
  }
}
</style>
