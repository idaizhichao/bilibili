<template>
  <div class="v-wrapper">
    <div class="l-con">
      <div class="video-info">
        <h1 class="video-data" v-text="videoInfo.originTitle"></h1>
        <p class="video-data">
          <a href="#" class="type" v-text="videoInfo.toptype"></a>
          >&nbsp;
          <a href="#" class="type" v-text="videoInfo.tname"></a>
          <span>{{ videoInfo.pubdate | timeStamp }}</span>
        </p>
        <p class="video-data">
          <span>{{ stat.view | number }}</span> ·<span
            >{{ stat.danmaku | number }} 弹幕</span
          >
          <span>未经作者授权，禁止转载</span>
        </p>
      </div>
      <div class="video-player">
        <div class="play-video-wrap">
          <div class="player-video-top">
            <div class="video-title" v-text="videoInfo.originTitle"></div>
            <div class="follow">
              <div>
                <img :src="videoInfo.owner.face" />
              </div>
              <span>+关注</span>
            </div>
            <div class="feedback">
              反馈
            </div>
          </div>
          <div class="player-video">
            <video
              ref="video"
              @click="handleVideoClick"
              :src="videoInfo.initUrl"
              :poster="videoInfo.pic"
            />
          </div>
          <div class="player-control">控制器</div>
        </div>
      </div>
    </div>
    <div class="r-con">
      right
    </div>
  </div>
</template>

<script>
import { video } from "@/api";
import moment from "moment";
export default {
  name: "player",
  data() {
    return {
      videoData: {},
      videoInfo: {},
      stat: {}
    };
  },
  created() {
    this.getVideoInfo();
  },
  filters: {
    timeStamp: value => {
      return moment(value, "X").format("YYYY-MM-DD hh:mm:ss");
    }
  },
  methods: {
    handleVideoClick() {
      console.log(this.$refs.video.paused);
      if (this.$refs.video.paused) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },
    getVideoInfo() {
      video.getVideoInfo(this.$route.params.aId).then(res => {
        console.log(res);
        this.videoData = res.data;
        this.videoInfo = res.data.videoInfo;
        this.stat = res.data.videoInfo.stat;
        console.log(this.videoInfo.stat.view);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
a,
p {
  color: #999;
}
.v-wrapper {
  max-width: 1660px;
  min-width: 980px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  .l-con {
    width: 1280px;
    h1 {
      font-size: 14px;
    }
    .video-data {
      margin-bottom: 5px;
      a,
      span {
        margin-right: 5px;
      }
    }
  }
  .r-con {
    width: 320px;
  }
}
.video-player {
  .play-video-wrap {
    &:hover {
      .player-video-top {
        opacity: 1;
      }
    }
    position: relative;
    background-color: #000;
    color: #fff;
    .player-video-top {
      opacity: 0;
      transition: opacity 0.5s;
      top: 10px;
      display: flex;
      width: 100%;
      position: absolute;
      justify-content: space-between;
      align-items: center;
      img {
        width: 25px;
        height: 25px;
        padding: 0 10px;
        border-radius: 50%;
        z-index: 2;
      }
      .follow {
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
          margin-left: 4px;
        }
      }
      .feedback {
        margin: 0 20px;
        cursor: pointer;
      }
      .video-title {
        flex: 1;
        cursor: default;
      }
    }
    .player-video {
      padding: 48px 7px;
      video {
        width: 100%;
        max-height: 100%;
      }
    }

    .player-control {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
