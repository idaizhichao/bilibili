<template>
  <div class="rank-wrapper">
    <div class="rank-tab">
      <div class="tab-left">
        <span
          v-for="partition in partitions"
          :key="partition.tid"
          @click="handlePartitionClick(partition.tid)"
          >{{ partition.typename }}</span
        >
      </div>
      <div class="tab-right">
        <select v-model="day" @change="getRankingById">
          <option value="1">日排行</option>
          <option value="3">三日排行</option>
          <option value="7">周排行</option>
          <option value="30">月排行</option>
        </select>
      </div>
    </div>
    <div v-if="list">
      <div class="rank-item" v-for="(item, index) in list" :key="item.aid">
        <div class="num">
          {{ index + 1 }}
        </div>
        <div class="image">
          <img :src="`${item.pic}@103w_63h.webp`" />
        </div>
        <div class="info">
          <a :href="`/player/av${item.aid}`" class="title" target="_blank">{{
            item.title
          }}</a>
          <div class="detail">
            <div class="data-box">
              <span class="data-item" title="播放">
                <i class="iconfont">&#xe784;</i>{{ item.play | number }}
              </span>
              <span class="data-item" title="弹幕">
                <i class="iconfont">&#xe610;</i>{{ item.video_review | number }}
              </span>
              <span class="data-item" title="作者">
                <i class="iconfont">&#xe665;</i>{{ item.author }}
              </span>
            </div>
            <div class="fraction">
              <div>{{ item.pts }}</div>
              综合得分
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="list.length === 0" class="loading">
      <div class="loading-gif"></div>
      <span>加载中</span>
    </div>
  </div>
</template>

<script>
import { rank } from "@/api";
export default {
  name: "Ranking",
  data() {
    return {
      list: [],
      node: undefined,
      partitions: [],
      tid: 0,
      day: 3
    };
  },
  beforeMount() {
    this.tid = this.$route.params.tid;
    this.getRankingById();
    this.getRankingPartitions();
    window.addEventListener("popstate", () => {
      let tid = this.$route.params.tid;
      if (tid !== this.tid) {
        this.tid = tid;
        this.getRankingById(this.tid);
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("popstate", () => {});
  },
  methods: {
    getRankingById(rId = this.tid, day = this.day) {
      if (typeof rId === "number") {
        this.tid = rId;
      }
      this.list = [];
      rank.getRankingById(this.tid, day).then(res => {
        this.node = res.data.note;
        this.list = res.data.list;
      });
    },
    getRankingPartitions() {
      rank.getRankingPartitions().then(res => {
        this.partitions = res.data.partitions;
      });
    },
    handlePartitionClick(tId) {
      let state = { title: "", url: window.location.href };
      history.pushState(state, "", `/ranking/${tId}`);
      this.getRankingById(tId);
    }
  }
};
</script>

<style scoped lang="scss">
.rank-wrapper {
  min-width: 1000px;
  max-width: 1400px;
  margin: 0 auto;
}
.num {
  color: #b8c0cc;
  height: 70px;
  width: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 33px;
}
.rank-item {
  padding-top: 20px;
  display: flex;
  border-bottom: 1px solid #e5e9ef;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 5px 5px #e5e9ef;
    .title {
      color: #00a1d6;
    }
  }
}
.info {
  width: 100%;
  margin-left: 7px;
  .title {
    transition: 0.3s;
    font-weight: 700;
    font-size: 14px;
  }
  .detail {
    width: 100%;
    margin-top: 20px;
    display: flex;
    .data-item {
      color: #99a2aa;
      margin-right: 15px;
    }
    .data-box {
      flex: 1;
    }
    .fraction {
      margin-right: 30px;
      margin-bottom: 10px;
      text-align: center;
      div {
        margin-top: -5px;
        font-size: 16px;
        color: #00a1d6;
        margin-bottom: 9px;
      }
    }
    .iconfont {
      margin-right: 4px;
      color: #e5e9ef;
    }
  }
}
.image {
  width: 114px;
  img {
    width: 100%;
    height: 70px;
    border-radius: 5px;
  }
}
.rank-tab {
  display: flex;
  line-height: 30px;
  justify-content: space-between;
  background-color: #edf2f9;
}
.tab-left {
  span {
    padding: 0 10px;
    margin-left: 10px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      color: #00a1d6;
    }
  }
}
.tab-right {
  margin-right: 20px;
}
.loading {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  .loading-gif {
    width: 25px;
    height: 25px;
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/rank/asserts/loading.gif);
  }
}
</style>
