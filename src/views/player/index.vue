<template>
  <div class="v-wrapper">
    <div class="l-con">
      <div>
        <div class="video-info">
          <h1 class="video-data" v-text="videoInfo.originTitle" />
          <p class="video-data">
            <a href="#" class="type" v-text="videoInfo.toptype" />
            >&nbsp;
            <a href="#" class="type" v-text="videoInfo.tname" />
            <span>{{ videoInfo.pubdate | timeStamp }}</span>
          </p>
          <p class="video-data">
            <span>{{ stat.view | number }}</span>
            ·
            <span>{{ stat.danmaku | number }} 弹幕</span>
            <span>未经作者授权，禁止转载</span>
          </p>
        </div>
        <BiVideo
          :cid="videoInfo.cid"
          :videoUrl="videoInfo.initUrl"
          :upFace="owner.face"
        />
      </div>
      <toolbar
        :stat="videoInfo.stat"
        :videoTag="videoData.videoTag"
        :videoDes="videoInfo.desc"
      />
      <reply :replies="replies" />
      <pagination @change="handlePaginationChange" :totle="page.count">
      </pagination>
    </div>
    <div>
      <RecommendRight
        :recommend="recommend"
        :videoInfo="videoInfo"
        :owner="owner"
        :userState="videoData.userState"
        @handleVideoCheck="handleVideoCheck"
      />
    </div>
  </div>
</template>

<script>
import { video } from "@/api";

import { Reply, Pagination } from "@/components";
import RecommendRight from "./RecomendRight";
import Toolbar from "./Toolbar";
import Video from "./Video";
import moment from "moment";
export default {
  name: "Player",
  components: {
    RecommendRight,
    Toolbar,
    Reply,
    Pagination,
    BiVideo: Video
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
      if (this.$refs.video.paused) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },
    getVideoInfo() {
      video.getVideoInfo(this.aId).then(res => {
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
      let state = { title: "", url: window.location.href };
      history.pushState(state, "", "av" + aid);
      history.pushState(state, "", "av" + aid);
      this.aId = window.location.href.split("av")[1];
      this.getVideoInfo();
      this.getRecommend();
    },
    getReply(aid, index) {
      video.getReply(aid, index).then(res => {
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
</style>
