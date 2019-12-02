<template>
  <div class="rank-list" style="margin-left:10px;">
    <header class="rank-header">
      <span>排行榜</span>
      <a href="#" target="_blink">更多<i class="iconfont">&#xe644;</i></a>
    </header>
    <div class="rank-warp" v-for="(item, index) in rankList" :key="item.aid">
      <span :class="'number ' + (index < 3 ? 'top-three' : '')">
        {{ index + 1 }}
      </span>
      <a target="_blank" href="#" class="title fontHover" v-if="index">
        <p title="网易是世界最好的公司网易是世界最好的公司网易是世界最好的公司">
          {{ item.title }}
        </p>
      </a>
      <div class="preview" v-if="!index">
        <div class="pic">
          <a target="_blank" href="#">
            <img
              src="//i2.hdslb.com/bfs/archive/6e240c15f17a03bea5ccc102722f29872d462975.jpg@112w_63h_1c_100q.webp"
            />
          </a>
        </div>
        <div class="txt">
          <p title="网易是世界最好的公司网易是世界最好的公司1">
            <a target="_blank" href="#" class="fontHover"
              >网易是世界最好的公司网易是世界最好的公司1</a
            >
          </p>
          <span>综合得分：194.6万</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rankList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.rank-list {
  width: 320px;
  display: flex;
  flex-direction: column;
  .rank-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    span {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
    }
    a {
      border: 1px solid silver;
      font-size: 12px;
      line-height: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      width: 58px;
      padding-left: 12px;
      box-sizing: border-box;
      i {
        font-size: 13px;
      }
    }
  }
  .rank-warp {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    .number {
      color: #999;
      font-size: 14px;
      width: 18px;
      line-height: 18px;
      height: 18px;
      text-align: center;
    }
    .top-three {
      color: white;
      background-color: #00a1d6;
    }
    .title {
      width: 290px;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        line-height: 20px;
      }
    }
    .preview {
      width: 290px;
      display: flex;
      justify-content: space-between;
      .pic {
        width: 112px;
        height: 64px;
      }
      .txt {
        margin-left: 12px;
        p {
          font-size: 14px;
          line-height: 20px;
          height: 40px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin-bottom: 5px;
        }
        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
