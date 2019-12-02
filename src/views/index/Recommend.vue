<template>
  <div class="b-wrap">
    <div class="frist space-between">
      <div class="loop-box">
        <img
          src="//i0.hdslb.com/bfs/archive/409520eb4d725596a8a9c6960c8b0a5355939c78.jpg@1100w_484h_1c_100q.jpg"
        />
      </div>
      <div class="recommend-box">
        <div class="info-box" v-for="item in recommend" :key="item">
          <a href="#" target="_blank">
            <img
              class="info-image"
              src="//i0.hdslb.com/bfs/archive/49a6509dd27e4a74193e257108a12c4ed84fb79e.jpg@206w_116h_1c_100q.webp"
            />
            <div class="info">
              <p class="info-title">
                【Warma x 七柠】太阳系Disco
              </p>
              <p class="up">
                <i class="iconfont">&#xe665;</i><span>七柠Official</span>
              </p>
              <p class="play">1.2万</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- 推广 -->
  </div>
</template>

<script>
export default {
  name: "Recommend",
  data() {
    return {
      recommend: [1, 2, 3, 4, 5, 6, 7, 8], //首页推荐
      progress: 0,
      height: 0,
      width: 0
    };
  },
  methods: {
    handleMousemove(el) {
      const value = el.offsetX / el.toElement.scrollWidth;
      const progress = parseFloat(value).toFixed(2) * 100;
      let number = Math.round(progress / 5) - 1;
      this.progress = progress;
      if (number < 10) {
        this.width = -number * 206;
        this.height = 10;
      } else {
        if (number === 10) {
          this.width = 0;
          return;
        }
        this.width = (20 - number - 10) * 206;
        this.height = -105.875;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/components/public.sass";

.frist {
  img {
    width: 100%;
  }
  .loop-box {
    width: 550px;
    height: 242px;
  }
  .recommend-box {
    width: 854px;
    height: 242px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .info-box {
      position: relative;
      width: 206px;
      height: 116px;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        opacity: 1;
        background-color: rgba($color: #000000, $alpha: 0.9);
        .info {
          top: 0;
          height: 100%;
        }
        .info-image {
          opacity: 0.5;
        }
        .info-title {
          display: inline-block;
          width: 100%;
          height: auto;
          word-wrap: break-word;
          word-break: break-all;
          text-overflow: unset;
          white-space: normal;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .later-play {
          span {
            transition: opacity 0.2s;
            opacity: 1;
          }
        }
      }
    }
    .info {
      position: absolute;
      top: 64px;
      padding: 26px 10px 10px;
      transition: top 0.2s;
      box-sizing: border-box;
      overflow: hidden;
      color: white;
      font-size: 12px;
      width: 100%;
      .info-title {
        font-size: 14px;
        line-height: 18px;
        height: 18px;
        color: #fff;
        margin-bottom: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
        margin-bottom: 6px;
      }
      .play,
      .up {
        color: #e0e0e0;
        margin-bottom: 3px;
        i {
          margin-right: 5px;
        }
      }
    }
    .later-play {
      span {
        position: absolute;
        bottom: 15px;
        right: 5px;
        font-size: 5px;
        color: white;
        background-color: rgba($color: #000000, $alpha: 0.5);
        padding: 3px;
        opacity: 0;
        &::before {
          opacity: 0;
          width: 50px;
          content: "稍后观看";
          position: absolute;
          right: -5px;
          bottom: 28px;
        }
        &:hover {
          &::before {
            transition: opacity 0.2s;
            opacity: 1;
          }
        }
      }
    }
  }
}
// 推广
</style>
