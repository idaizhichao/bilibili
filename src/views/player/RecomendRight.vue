<template>
  <div class="r-con">
    <!-- up主信息 -->
    <div class="u-info">
      <div class="face">
        <a>
          <img :src="owner.face" />
        </a>
      </div>
      <div class="info">
        <div>
          <p>
            <span class="username" v-text="owner.name"></span
            ><span class="message">发消息</span>
          </p>
          <p class="desc" :title="videoInfo.descs">{{ videoInfo.desc }}</p>
        </div>
        <div class="btn-panel">
          <div class="btn-default charge-btn">
            <span>充电</span>
          </div>
          <div class="btn-default follow-btn">
            <span>
              <i class="iconfont">&#xe641;</i> 关注
              <span class="follow-num">{{ userState.follower | number }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 相关推荐 -->
    <div class="rec-list">
      <div class="rec-title">
        相关推荐
      </div>
      <div class="card-box" v-for="item in recommendCopy" :key="item.aid">
        <div class="pic">
          <a
            :href="`/player/av${item.aid}`"
            @click.prevent="handleVideoCheck(item.aid)"
          >
            <img :src="item.pic + '@336w_190h.webp'" />
          </a>
        </div>
        <div class="info">
          <a
            class="info-title"
            :href="`/player/av${item.aid}`"
            @click.prevent="handleVideoCheck(item.aid)"
            :title="item.title"
            v-text="item.title"
          >
          </a>
          <div class="up-name">
            <a href="#" target="_blank" v-text="item.owner.name"> </a>
          </div>
          <div>
            {{ item.stat.view | number }}&nbsp;·&nbsp;{{
              item.stat.danmaku | number
            }}弹幕
          </div>
        </div>
      </div>
      <div
        class="rec-footer"
        @click="handleOpenClick"
        v-text="isOpen ? '收缩' : '展开'"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendRight",
  props: {
    recommend: {
      type: Array,
      default: () => []
    },
    videoInfo: {
      type: Object,
      default: () => {
        return {
          desc: "-"
        };
      }
    },
    owner: {
      type: Object,
      default: () => {}
    },
    userState: {
      type: Object,
      default: () => {
        return {
          follower: 0
        };
      }
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    recommendCopy() {
      if (this.isOpen) {
        return [...this.recommend];
      } else {
        return [...this.recommend].splice(0, 19);
      }
    }
  },
  methods: {
    handleVideoCheck(aid) {
      console.log(aid);
      this.$emit("handleVideoCheck", aid);
    },
    handleOpenClick() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
a,
p {
  color: #999;
}
.r-con {
  margin-left: 30px;
  width: 320px;
  .u-info {
    display: flex;
    .face {
      height: 48px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    .info {
      margin-left: 10px;
      .username {
        font-size: 14px;
        color: #333;
        margin-right: 10px;
      }
      .message {
        font-size: 12px;
      }
      .desc {
        width: 256px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .follow-btn {
        cursor: pointer;
        margin: 8px 0;
        background-color: #00a1d6;
        width: 156px;
        color: white;
        i {
          font-size: 12px;
        }
        span {
          font-size: 13px;
        }
        .follow-num {
          margin-left: 4px;
        }
      }
      .btn-default {
        transition: all 0.3s;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
        box-sizing: border-box;
      }
      .charge-btn {
        width: 90px;
        background: #fff;
        border: 1px solid #fb7299;
        color: #fb7299;
        margin-right: 10px;
      }
    }
  }
  // 相关视频推荐
  .rec-list {
    width: 100%;
    .rec-title {
      font-size: 16px;
      color: #222;
      margin-bottom: 6px;
    }
  }
}
.card-box {
  padding: 6px 0;
  display: flex;
  height: 80px;
  .pic {
    width: 141px;
    img {
      width: 141px;
      height: 80px;
    }
  }
  .info {
    margin-left: 10px;
    color: #999;
    .info-title {
      color: #333;
      line-height: 18px;
      height: 36px;
      font-size: 14px;
      text-overflow: unset;
      white-space: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .up-name {
      margin: 6px 0;
    }
  }
}
.btn-panel {
  display: flex;
  align-items: center;
  margin: 8px 0;
}
.rec-footer {
  margin-top: 10px;
  width: 100%;
  height: 42px;
  line-height: 42px;
  background-color: #f4f5f7;
  color: #999;
  text-align: center;
  cursor: pointer;
}
</style>
