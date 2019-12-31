<template>
  <div>
    <div class="video-info">
      <h1 class="video-data" v-text="videoInfo.originTitle"></h1>
      <p class="video-data">
        <a href="#" class="type" v-text="videoInfo.toptype"></a>
        >&nbsp;
        <a href="#" class="type" v-text="videoInfo.tname"></a>
        <span>{{ videoInfo.pubdate | timeStamp }}</span>
      </p>
      <p class="video-data">
        <span>{{ stat.view | number }}</span>
        ·
        <span>{{ stat.danmaku | number }} 弹幕</span>
        <span>未经作者授权，禁止转载</span>
      </p>
    </div>
    <div class="video-player">
      <div class="play-video-wrap">
        <div class="player-video-top">
          <div class="video-title"></div>
          <div class="follow">
            <div>
              <img :src="owner.face" />
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
            @loadedmetadata="handleLoadMetaData"
            @timeupdate="handleTimeUpdate"
            @click="handleVideoClick"
            :src="videoInfo.initUrl"
          />
        </div>
        <div class="player-control">
          <div class="video-control">
            <div>
              <div
                class="video-control-bar"
                @click="handleControlBarClick"
                @mousemove="handleControlBarMousemove"
                @mouseleave="handleControlBarMouseleave"
                ref="controlBar"
              >
                <div
                  class="load-bar"
                  :style="`transform:scaleX(${scaleX})`"
                ></div>
              </div>
              <div
                class="current-locaction"
                :style="`left: ${mouseCurrent}px`"
                v-show="isCurrent"
              >
                <span class="top"></span>
                <span class="bottom"></span>
              </div>
            </div>
            <div
              :style="`margin-left:${mouseCurrent - 80}px`"
              v-show="isCurrent"
            >
              <div
                class="preview"
                ref="preview"
                :style="
                  `background-position: ${positionWidth}px ${positionHeight}px`
                "
              ></div>
            </div>
            <div class="video-control-bottom">
              <div class="bottom-left">
                <icon class="iconfont play-button" @click="handleVideoClick">{{
                  isPlay === false ? "&#xe640;" : "&#xe784;"
                }}</icon>
                <span class="play-tiem">{{ current }} / {{ duration }}</span>
              </div>
              <div class="bottom-right">
                <div class="right-item">
                  <span title="弹幕设置"
                    ><icon class="iconfont play-button ">&#xe628;</icon></span
                  >
                </div>
                <div class="right-item">
                  <div class="autio-bar"></div>
                  <span title="音量设置"
                    ><icon class="iconfont  play-button">&#xe732;</icon></span
                  >
                </div>
                <div class="right-item">
                  <span title="清晰度选择" class="play-button">自动</span>
                </div>
                <div class="right-item">
                  <span title="设置"
                    ><icon class="iconfont play-button ">&#xe71b;</icon></span
                  >
                </div>
                <div class="right-item">
                  <span title="全屏"
                    ><icon class="iconfont play-button">&#xe828;</icon></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { timeFormat } from "@/utils/util";

export default {
  name: "PlayerLeft",
  props: {
    videoInfo: {
      type: Object,
      default: () => {}
    },
    owner: {
      type: Object,
      default: () => {
        return {
          pubdate: "-"
        };
      }
    },
    stat: {
      type: Object,
      default: () => {
        return { danmaku: "-", view: "-" };
      }
    }
  },
  data() {
    return {
      duration: "00:00",
      current: "00:00",
      mouseCurrent: 0,
      isCurrent: false,
      positionWidth: 0,
      positionHeight: 0,
      isPlay: false,
      scaleX: 0
    };
  },
  filters: {
    timeStamp: value => {
      if (value !== "-") {
        return moment(value, "X").format("YYYY-MM-DD hh:mm:ss");
      }
    }
  },
  methods: {
    handleVideoClick() {
      let videoElement = this.$refs.video;
      this.isPlay =
        videoElement.currentTime > 0 &&
        !videoElement.paused &&
        !videoElement.ended &&
        videoElement.readyState > 2;
      if (!this.isPlay) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
      return false;
    },
    handleTimeUpdate() {
      this.current = timeFormat(Math.round(this.$refs.video.currentTime));
      this.scaleX = parseFloat(
        this.$refs.video.currentTime / this.$refs.video.duration
      ).toFixed(4);
    },
    handleLoadMetaData() {
      this.duration = timeFormat(Math.round(this.$refs.video.duration));
    },
    handleControlBarMousemove(e) {
      if (!this.$refs.preview.style.backgroundImage) {
        this.$refs.preview.style.backgroundImage = `url("https://i0.hdslb.com/bfs/videoshot/${this.videoInfo.cid}.jpg@.webp`;
      }

      this.mouseCurrent = e.layerX;
      // console.log(e.target)
      // console.log(e.target.offsetWidth)
      this.isCurrent = true;
      const value = e.layerX / e.target.offsetWidth;
      const progress = parseFloat(value).toFixed(2) * 100;
      let number = Math.round(progress / 5) - 1;
      this.progress = progress;
      if (number < 10) {
        this.positionWidth = -number * 160;
        this.positionHeight = 0;
      } else {
        if (number === 10) {
          this.positionWidth = 0;
          this.positionHeight = -90;
          return;
        }
        this.positionWidth = (20 - number - 10) * 160;
        this.positionHeight = -90;
      }
    },
    handleControlBarMouseleave() {
      this.isCurrent = false;
    },
    handleControlBarClick(e) {
      this.$refs.video.currentTime =
        this.$refs.video.duration * (e.offsetX / e.target.scrollWidth);
    }
  }
};
</script>

<style lang="scss" scoped>
.video-data {
  margin-bottom: 12px;
  a,
  span {
    margin-right: 5px;
    color: #999;
  }
}
h1 {
  font-size: 18px;
  color: #333;
}
.video-player {
  height: auto;
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
      padding: 0 7px;
      height: 678px;
      width: 100%;
      box-sizing: border-box;
      video {
        height: 100%;
        width: 100%;
      }
    }
    .player-control {
      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
}

.contorl-wrap {
  position: absolute;
  bottom: 0;
  padding: 0 12px;
}
.video-control {
  width: 100%;
  padding: 0 7px;
  box-sizing: border-box;
}
.video-control-bottom {
  height: 29px;
  line-height: 29px;
  display: flex;
  .bottom-left {
    flex: 1;
  }
  .bottom-right {
    display: flex;
  }
}
.play-button {
  margin: 0 10px;
  color: #00a1d6;
  cursor: pointer;
}

.video-control-bar {
  z-index: 2;
  cursor: pointer;
  width: 100%;
  background: hsla(0, 0%, 100%, 0.2);
  height: 12px;
  position: relative;
  .load-bar {
    position: absolute;
    bottom: 1px;
    width: 100%;
    transform-origin: 0%;
    left: 0;
    height: 4px;
    background-color: red;
  }
}
.current-locaction {
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: -5px;
  cursor: pointer;
  .top {
    margin-top: 5px;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top: 4px solid #00a1d6;
    margin-bottom: 5px;
  }
  .bottom {
    bottom: 0;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-bottom: 4px solid #00a1d6;
  }
}
.preview {
  position: absolute;
  bottom: 48px;
  width: 160px;
  height: 90px;
}
</style>
