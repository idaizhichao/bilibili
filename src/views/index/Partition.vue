<template>
  <div class="b-wrap space-between" ref="lazy">
    <div class="extension-left">
      <header class="l-title">
        <div class="header-left">
          <svg class="svg-icon">
            <use :xlink:href="icon" />
          </svg>
          <span
            ><a href="#">{{ title }}</a></span
          >
          <div class="table-switch" v-if="isTimeLine">
            <div
              :class="'item ' + (index + 1 === checkedWeek ? 'item-on' : '')"
              @click="handleTabSwitch(index + 1)"
              v-for="(item, index) in timeLine"
              :key="item.date"
            >
              {{ index | week }}
            </div>
          </div>
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
      <div>
        <div
          v-if="!isTimeLine"
          class="l-con"
          :style="'height:' + conHeight + 'px'"
        >
          <Commend-Card
            v-for="item in dynamic.archives"
            :key="item.aid"
            :data="item"
          />
        </div>
        <TimeLineCard :types="1" :lists="lists.episodes" v-if="isTimeLine" />
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
          <a
            target="_blank"
            :href="'/player/av' + item.aid"
            class="title fontHover"
            v-if="index && !isTimeLine"
          >
            <p :title="item.title">
              {{ item.title }}
            </p>
          </a>
          <a
            target="_blank"
            :href="'/player/av' + item.aid"
            class="title fontHover"
            v-if="isTimeLine"
          >
            <p :title="item.title" class="txt">
              <span class="txt-title">
                {{ item.title }}
              </span>
              <span class="txt-update">
                {{ item.new_ep.index_show }}
              </span>
            </p>
          </a>
          <div class="preview" v-if="!index && !isTimeLine">
            <div class="pic">
              <a target="_blank" :href="'/player/av' + item.aid">
                <img :src="item.pic + '@112w_63h_1c_100q.webp'" />
              </a>
            </div>
            <div class="txt">
              <p :title="item.title">
                <a
                  target="_blank"
                  :href="'/player/av' + item.aid"
                  class="fontHover"
                  >{{ item.title }}
                </a>
              </p>
              <span>综合得分：{{ item.play | number }}</span>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import { CommendCard } from "@/components";
import { rank, region, main } from "@/api";
import TimeLineCard from "./TimeLineCard";

export default {
  name: "Parttion",
  components: {
    CommendCard,
    TimeLineCard
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
    },
    isTimeLine: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rankList: [],
      dynamic: [],
      timeLine: [],
      lists: [],
      checkedWeek: 1
    };
  },
  filters: {
    week(value) {
      switch (value) {
        case 0:
          return "星期一";
        case 1:
          return "星期二";
        case 2:
          return "星期三";
        case 3:
          return "星期四";
        case 4:
          return "星期五";
        case 5:
          return "星期六";
        case 6:
          return "星期天";
      }
    },
    number: value => {
      if (value < 10000) {
        return value;
      } else {
        return (value / 10000).toFixed(1) + "万";
      }
    }
  },
  methods: {
    // 获得分区排行榜
    getRegion(rId, day) {
      rank.getRegion(rId, day).then(res => {
        res.data.length = 10;
        this.rankList = res.data;
      });
    },
    // 获得分区动态
    getRegionDynamic(rId, ps) {
      region.getRegionDynamic(rId, ps).then(res => {
        this.dynamic = res.data;
      });
    },
    handleClick() {
      this.getRegionDynamic(this.rId, this.ps);
    },
    // 获得分区排行榜 新番和国创
    getRankSeason(seasonType, day) {
      main.getRankSeason(seasonType, day).then(res => {
        res.data.list.length = 10;
        this.rankList = res.data.list;
      });
    },
    // 处理切换日期点击
    handleTabSwitch(week) {
      console.log(week);
      this.timeLine.map((item, index) => {
        if (item.day_of_week === week) {
          console.log(index);
          this.lists = this.timeLine[index];
          this.checkedWeek = week;
          return;
        }
      });
    },
    // 获取时间线数据
    getTimeLine(types) {
      console.log(types);
      main.getTimeLine(types).then(res => {
        this.timeLine = res.data;
        res.data.map((item, index) => {
          if (item.is_today === 1) {
            this.checkedWeek = item.day_of_week;
            this.lists = res.data[index];
            console.log(this.lists);
            return;
          }
        });
      });
    }
  },
  mounted() {
    let _this = this;
    let observer = new IntersectionObserver(onIntersection);
    let lazy = this.$refs.lazy;
    observer.observe(lazy);
    function onIntersection(entries) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          observer.unobserve(entry.target);
          console.log(entry.target);
          if (_this.isTimeLine) {
            _this.getRankSeason(_this.rId, _this.day);
            _this.getTimeLine(_this.rId);
          } else {
            _this.getRegion(_this.rId, _this.day);
            _this.getRegionDynamic(_this.rId, _this.ps);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/components/public.sass";

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
  margin-bottom: 16px;
  .header-left {
    display: flex;
    align-items: center;
  }
  .svg-icon {
    width: 23px;
    height: 23px;
    margin-right: 6px;
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
      background-color: $hoverColor;
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
      .txt {
        display: flex;
        justify-content: space-between;
        .txt-title {
          width: 198px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .txt-updatedd {
          width: 90px;
        }
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
// 切换日期
.table-switch {
  display: flex;
  align-items: center;
  .item {
    margin-right: 20px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
  }
  .item-on {
    color: $hoverColor;
    border-bottom: 1px solid $hoverColor;
  }
}
</style>
