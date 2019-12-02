<template>
  <div class="b-wrap space-between">
    <div class="extension-left">
      <header class="l-title">
        <div>
          <i class="iconfont" v-html="icon" :style="'color:' + iconColor"></i>
          <span
            ><a href="#">{{ title }}</a></span
          >
          <slot name="tabSwitch"></slot>
        </div>
        <slot name="custom">
          <div class="btn-change" v-if="change">
            <div class="switch" @click="handleClick">
              <i class="iconfont">&#xe6cd;</i>
              <span>换一换</span>
            </div>
            <div class="more">
              <a target="_blank">
                <span>更多</span><i class="iconfont">&#xe644;</i></a
              >
            </div>
          </div>
        </slot>
      </header>
      <div class="l-con" :style="'height:' + conHeight + 'px'">
        <slot name="card">
          <commend-card
            v-for="item in dynamic.archives"
            :key="item.aid"
            :data="item"
          ></commend-card>
        </slot>
      </div>
    </div>

    <slot name="right">
      <div class="rank-list" style="margin-left:10px;">
        <header class="rank-header">
          <span>排行榜</span>
          <a href="#" target="_blink">更多<i class="iconfont">&#xe644;</i></a>
        </header>
        <div
          class="rank-warp"
          v-for="(item, index) in rankList"
          :key="item.aid"
        >
          <span :class="'number ' + (index < 3 ? 'top-three' : '')">
            {{ index + 1 }}
          </span>
          <a target="_blank" href="#" class="title fontHover" v-if="index">
            <p :title="item.title">
              {{ item.title }}
            </p>
          </a>
          <div class="preview" v-if="!index">
            <div class="pic">
              <a target="_blank" href="#">
                <img :src="item.pic" />
              </a>
            </div>
            <div class="txt">
              <p title="网易是世界最好的公司网易是世界最好的公司1">
                <a target="_blank" href="#" class="fontHover">{{
                  item.title
                }}</a>
              </p>
              <span>综合得分：194.6万</span>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import { CommendCard } from "@/components";
import { rank, region } from "@/api";
export default {
  name: "Parttion",
  components: {
    CommendCard
  },
  props: {
    change: {
      type: Boolean,
      default: true
    },
    conHeight: {
      type: Number,
      default: 404
    },
    title: {
      type: String,
      require
    },
    icon: {
      tpye: String,
      require
    },
    iconColor: {
      type: String,
      require
    },
    rId: {
      type: Number,
      default: 36
    },
    day: {
      type: Number,
      default: 3
    },
    ps: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      extension: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      rankList: [],
      dynamic: []
    };
  },
  methods: {
    getRegion(rId, day) {
      rank.getRegion(rId, day).then(res => {
        res.data.length = 10;
        this.rankList = res.data;
      });
    },
    getRegionDynamic(rId, ps) {
      region.getRegionDynamic(rId, ps).then(res => {
        this.dynamic = res.data;
      });
    },
    handleClick() {
      this.getRegionDynamic(this.rId, this.ps);
    }
  },
  beforeMount() {
    this.getRegion(this.rId, this.day);
    this.getRegionDynamic(this.rId, this.ps);
  }
};
</script>

<style lang="scss" scoped>
.extension-left {
  width: 1070px;
  i {
    margin-right: 6px;
  }
}
.l-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    font-size: 23px;
    color: rgb(255, 215, 120);
  }
  span {
    box-sizing: border-box;
    font-size: 20px;
    line-height: 36px;
    a {
      color: #333;
      margin-right: 20px;
    }
  }
  .btn-change {
    height: 22px;
    width: 142px;
    justify-content: space-between;
    display: flex;
    font-size: 14px;
    span,
    a {
      font-size: 14px;
    }
  }
  .switch,
  .more {
    cursor: pointer;
    display: flex;
    align-items: center;
    i {
      font-size: 16px;
    }
    &:hover {
      background: #f4f4f4;
    }
  }
  .switch {
    padding: 0 2px;
  }
  .more {
    margin-right: 0;
    padding-left: 10px;
  }
}
.l-con {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-wrap: wrap;
  width: 1070px;
  height: 404px;
}
.l-con-box {
  width: 206px;
  position: relative;
  img {
    width: 100%;
  }
}

// 推广左侧
.extension-right {
  width: 320px;
  .live-list {
    a {
      color: #333;
      font-size: 13px;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      margin: 5px 0;
      line-height: 30px;
    }
  }
  .right-img {
    img {
      width: 100%;
    }
  }
}

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
        img {
          width: 100;
          height: 100%;
        }
      }
      .txt {
        margin-left: 12px;
        p {
          width: 168px;
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
