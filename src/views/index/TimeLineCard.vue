<template>
  <div class="customCard">
    <div class="item" v-for="item in lists" :key="item.date">
      <div class="item-image">
        <a href="#" target="_blank" :title="item.title">
          <img :src="item.square_cover + '@70w_70h_1c_100q.webp'" />
        </a>
      </div>
      <div class="item-txt">
        <a class="title" href="#" target="_blank" :title="item.title">{{
          item.title
        }}</a>
        <span
          ><a href="#"> {{ item.pub_index }}</a></span
        >
      </div>
    </div>
    <div class="no-data" v-if="!lists.length">
      <span>今天没更新呀！</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "timeLineCard",
  props: {
    types: {
      type: Number,
      required: true
    },
    lists: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/components/public.sass";

.customCard {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  .item {
    width: 232px;
    height: 70px;
    margin: 0 30px 24px 0;
    display: flex;
    justify-content: space-between;
    .item-image {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .item-txt {
      width: 152px;
      display: flex;
      flex-direction: column;
      .title {
        height: 37px;
        margin: 2px 0 12px;
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      span a {
        font-size: 12px;
        color: $hoverColor;
      }
    }
  }
}
.no-data {
  width: 100%;
  height: 100%;
  background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/asserts/bgm-nodata.png);
  background-repeat: no-repeat;
  background-position: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-top: -120px;
    font-size: 13px;
    color: #333;
  }
}
</style>
