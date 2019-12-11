<template>
  <div :class="'wrapper ' + 'wrapper-' + [this.device]">
    <div class="singin">
      <div class="item">
        <img
          src="//i2.hdslb.com/bfs/face/a502432b4f1ae03e9fcfba4f60c31700de148608.jpg@70w_70h_1c_100q.webp"
        />
      </div>
      <div class="item">
        <span><a href="#">大会员</a></span>
      </div>
      <div class="item">
        <span><a href="#">消息</a></span>
      </div>
      <div class="item">
        <span><a href="#">动态</a></span>
      </div>
      <div class="item">
        <span><a href="#">收藏</a></span>
      </div>
      <div class="item">
        <span><a href="#">历史</a></span>
      </div>
      <div class="item">
        <span><a href="#">创作中心</a></span>
      </div>
    </div>
    <div class="contribute">
      <a href="#"><span>投稿</span></a>
    </div>
  </div>
</template>

<script>
import { AppDeviceEnquire, mixinDevice } from "@/utils/mixin";

export default {
  name: "userLink",
  mixins: [AppDeviceEnquire, mixinDevice]
};
</script>

<style lang="scss" scoped>
.wrapper-tablet,
.wrapper-mobile {
  min-width: 450px;
}
.wrapper {
  display: flex;
  justify-content: flex-end;
}
.item {
  margin-left: 12px;
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 12px;
  }
  span a {
    display: inline-block;
    height: 36px;
    line-height: 36px;
    color: white;
    font-size: 13px;
    text-decoration: none;
  }
}
.singin {
  display: flex;
  justify-items: center;
}
.contribute {
  margin-left: 20px;
  width: 100px;
  height: 36px;
  a {
    color: white;
  }
  span {
    display: block;
    background-color: #fb7299;
    font-size: 15px;
    line-height: 36px;
    height: 36px;
    text-align: center;
    border-radius: 2px;
  }
}
</style>
