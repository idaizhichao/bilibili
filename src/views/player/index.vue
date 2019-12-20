<template>
  <div class="v-wrapper">
    <div class="l-con">
      <player-left
        @getVideoInfo="getVideoInfo"
        @getRecommend="getRecommend"
        :videoInfo="videoInfo"
        :owner="owner"
        :stat="videoInfo.stat"
      ></player-left>
      <toolbar
        :stat="videoInfo.stat"
        :videoTag="videoData.videoTag"
        :videoDes="videoInfo.desc"
      ></toolbar>
      <reply :replies="replies"></reply>
      <pagination @change="handlePaginationChange" :totle="page.count">
      </pagination>
    </div>
    <div>
      <recommend-right
        :recommend="recommend"
        :videoInfo="videoInfo"
        :owner="owner"
        :userState="videoData.userState"
        @handleVideoCheck="handleVideoCheck"
      ></recommend-right>
    </div>
  </div>
</template>

<script>
import { video } from "@/api";

import { Reply, Pagination } from "@/components";
import RecommendRight from "./RecomendRight";
import Toolbar from "./Toolbar";
import PlayerLeft from "./PlayerLeft";
import moment from "moment";
export default {
  name: "Player",
  components: {
    RecommendRight,
    Toolbar,
    Reply,
    Pagination,
    PlayerLeft
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
      index: 1,
      page: {},
      isOpen: false,
      top: 0,
      left: 0,
      member: {},
      mid: undefined
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
        this.page = res.data.page;
        this.replies = res.data.replies;
      });
    },
    handlePaginationChange(index) {
      this.getReply(this.videoInfo.aid, index);
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
  }
}
</style>
