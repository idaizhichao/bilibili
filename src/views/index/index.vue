<template>
  <div ref="index">
    <Recommend />
    <Partition
      :title="'推广'"
      :icon="'#icon-youxi'"
      :change="false"
      :conHeight="192"
    >
      <template v-slot:right>
        <div class="extension-right">
          <div class="live-list ">
            <a href="#" class="fontHover">在线列表</a>
          </div>
          <a class="right-img">
            <img
              src="//i0.hdslb.com/bfs/archive/2d03dd2c0137f5632085ca8cc6f42bcf7b092cf6.jpg"
            />
          </a>
        </div>
      </template>
    </Partition>
    <Partition :title="'游戏'" :icon="'#icon-youxi'" :rId="4"> </Partition>
    <Partition :title="'舞蹈'" :icon="'#icon-guixu'" :rId="129"> </Partition>
    <Partition :title="'动画'" :icon="'#icon-fanju'" :rId="1"> </Partition>
    <Partition
      :title="'音乐'"
      :icon="'#icon-tubiaozhizuomobanyihuifu-'"
      :rId="3"
    >
    </Partition>
    <Partition :title="'娱乐'" :icon="'#icon-youxi'" :rId="5"> </Partition>
    <Partition
      :title="'番剧'"
      :icon="'#icon-fanju'"
      :conHeight="376"
      :rId="1"
      :isTimeLine="true"
      :isTabSwitch="true"
    >
      <template v-slot:custom>
        <div class="game-custom">
          <a href="#"> 新番播放时间<i class="iconfont">&#xe644;</i> </a>
        </div>
      </template>
    </Partition>
    <Partition :title="'番剧动态'" :icon="'#icon-fanjutuijian'" :rId="1">
    </Partition>
  </div>
</template>

<script>
import Recommend from "./Recommend";
import Partition from "./Partition";
// import { LazyComponent } from "@/components";
export default {
  name: "index",
  components: {
    Recommend,
    Partition
  },
  data() {
    return {
      lists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      gameRankList: []
    };
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "@/components/public.sass";
a:visited {
  color: #333;
}
@media screen and(max-width: 1870px) {
  .b-wrap {
    width: 1414px;
  }
  .l-con {
    width: 1070px;
  }
  .l-con-box:nth-of-type(11) {
    display: none;
  }
  .l-con-box:nth-of-type(12) {
    display: none;
  }
}
@media screen and(max-width: 1654px) {
  .b-wrap {
    width: 1198px;
  }
  .l-con {
    width: 854px;
  }
  .l-con-box:nth-of-type(9) {
    display: none;
  }
  .l-con-box:nth-of-type(10) {
    display: none;
  }
  .l-con-box:nth-of-type(11) {
    display: none;
  }
  .l-con-box:nth-of-type(12) {
    display: none;
  }
}
.b-wrap {
  min-width: 1000px;
  max-width: 1630px;
  margin: 0 auto;
}
.space-between {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 40px;
}
.fontHover:hover {
  transition: color 0.2s;
  color: $hoverColor !important;
}
.game-custom {
  a {
    border: 1px solid $hoverColor;
    color: $hoverColor;
    font-size: 14px;
    display: flex;
    align-items: center;
    width: 112px;
    height: 30px;
    line-height: 30px;
    padding-left: 7px;
    box-sizing: border-box;
    i {
      font-size: 14px !important;
      color: $hoverColor !important;
      margin-right: 0px !important;
    }
    &:hover {
      color: white;
      background-color: $hoverColor;
    }
  }
}
</style>
