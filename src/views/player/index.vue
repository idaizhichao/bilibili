<template>
  <div class="v-wrapper">
    <div class="l-con">
      <div class="video-info">
        <h1 class="video-data" v-text="videoInfo.originTitle"></h1>
        <p class="video-data">
          <a href="#" class="type" v-text="videoInfo.toptype"></a>
          >&nbsp;
          <a href="#" class="type" v-text="videoInfo.tname"></a>
          <span>{{
            (videoInfo.pubdate ? videoInfo.pubdate : "-") | timeStamp
          }}</span>
        </p>
        <p class="video-data">
          <span>{{ (stat.view ? stat.view : "-") | number }}</span> ·<span
            >{{ (stat.danmaku ? stat.danmaku : "-") | number }} 弹幕</span
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
              @click="handleVideoClick"
              :src="videoInfo.initUrl"
              :poster="videoInfo.pic"
            />
          </div>
          <div class="player-control">控制器</div>
        </div>
      </div>
      <toolbar></toolbar>
      <reply :replyItem="item" v-for="item in replies" :key="item.rpid"></reply>
    </div>
    <recommend-right
      :recommend="recommend"
      :videoInfo="videoInfo"
      :owner="owner"
      @handleVideoCheck="handleVideoCheck"
    ></recommend-right>
  </div>
</template>

<script>
import { video } from "@/api";
import { Reply } from "@/components";
import RecommendRight from "./RecomendRight";
import Toolbar from "./Toolbar";
import moment from "moment";
export default {
  name: "player",
  components: {
    RecommendRight,
    Toolbar,
    Reply
  },
  data() {
    return {
      aId: this.$route.params.aId,
      videoData: {},
      videoInfo: {},
      videoTag: {},
      stat: {},
      owner: {},
      recommend: [],
      replies: [],
      index: 1
    };
  },
  beforeMount() {
    this.getVideoInfo();
    this.getRecommend();
    window.addEventListener("popstate", () => {
      let av = window.location.href.split("av")[1];
      if (av && av !== this.aId) {
        this.aId = av;
        this.getVideoInfo();
        this.getRecommend();
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("popstate");
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
      console.log(this.$refs.video.paused);
      if (this.$refs.video.paused) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },
    getVideoInfo() {
      video.getVideoInfo(this.aId).then(res => {
        console.log(res);
        this.videoData = res.data;
        this.videoInfo = res.data.videoInfo;
        this.stat = res.data.videoInfo.stat;
        this.videoTag = res.data.videoTag;
        this.owner = res.data.videoInfo.owner;
        this.getReply(this.videoInfo.aid, this.index);
      });
    },
    getRecommend() {
      video.getRecommend(this.aId).then(res => {
        this.recommend = res.data;
        this.recommend.length = 20;
      });
    },
    handleVideoCheck(aid) {
      var state = { title: "", url: window.location.href };
      history.pushState(state, "", "av" + aid);
      history.pushState(state, "", "av" + aid);
      this.aId = window.location.href.split("av")[1];
      this.getVideoInfo();
      this.getRecommend();
    },
    getReply(aid, index) {
      video.getReply(aid, index).then(res => {
        console.log(res);
        this.replies = res.data.replies;
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
  max-width: 1400px;
  min-width: 980px;
  margin: 20px auto;
  display: flex;
  justify-content: row;
  .l-con {
    width: 1044px;
    h1 {
      font-size: 14px;
    }
    .video-data {
      margin-bottom: 12px;
      a,
      span {
        margin-right: 5px;
      }
    }
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
      height: 578px;
      width: 100%;
      box-sizing: border-box;
      video {
        height: 100%;
        width: 100%;
      }
    }
    .player-control {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
