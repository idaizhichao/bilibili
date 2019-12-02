<template>
  <div class="wrapper">
    <div>
      <ul class="primary">
        <li v-for="item in primary" :key="item.title">
          <a :href="item.toPath">
            <div class="primary-div" :style="'background-color:' + item.color">
              <i class="iconfont" v-html="item.icon"></i>
            </div>
            <span>{{ item.title }}</span>
          </a>
        </li>
      </ul>
    </div>
    <span class="table-line"></span>
    <div class="partition">
      <span class="partition-span" v-for="item in partition" :key="item.title">
        <a :href="item.toPath">
          <div>
            <span
              >{{ item.title }}<em>{{ item.count }}</em></span
            >
          </div>
        </a>
      </span>
    </div>
    <span class="table-line"></span>
    <div class="friendshipLink">
      <span class="wrapper-span" v-for="item in link" :key="item.title">
        <a :href="item.toPath">
          <div class="link-div">
            <i
              class="iconfont"
              :style="'font-size: 18px; color:' + item.color"
              v-html="item.icon"
            ></i>
            <span>{{ item.title }}</span>
          </div>
        </a>
      </span>
    </div>
  </div>
</template>

<script>
const primary = [
  {
    title: "首页",
    icon: "&#xe613;",
    toPath: "/",
    color: "#ff5c7c"
  },
  {
    title: "动态",
    icon: "&#xe62d;",
    toPath: "/",
    color: "#fcba2a"
  },
  {
    title: "排行榜",
    icon: "&#xe603;",
    toPath: "/",
    color: "#00a1d6"
  }
];
const partition = [
  {
    title: "动画",
    count: "999+",
    toPath: "/"
  },
  {
    title: "音乐",
    count: "999+",
    toPath: "/"
  },
  {
    title: "舞蹈",
    count: "561",
    toPath: "/"
  },
  {
    title: "科技",
    count: "999+",
    toPath: "/"
  },
  {
    title: "生活",
    count: "999+",
    toPath: "/"
  },
  {
    title: "时尚",
    count: "878",
    toPath: "/"
  },
  {
    title: "娱乐",
    count: "999+",
    toPath: "/"
  },
  {
    title: "番剧",
    count: "96",
    toPath: "/"
  },
  {
    title: "国创",
    count: "134",
    toPath: "/"
  },
  {
    title: "游戏",
    count: "999+",
    toPath: "/"
  },
  {
    title: "数码",
    count: "500",
    toPath: "/"
  },
  {
    title: "鬼畜",
    count: "102",
    toPath: "/"
  },
  {
    title: "广告",
    count: "170",
    toPath: "/"
  },
  {
    title: "影视",
    count: "999+",
    toPath: "/"
  },
  {
    title: "搞笑",
    count: "999+",
    toPath: "/"
  },
  {
    title: "放映厅",
    count: "375",
    toPath: "/"
  },
  {
    title: "动物圈",
    count: "999+",
    toPath: "/"
  },
  {
    title: "美食圈",
    count: "999+",
    toPath: "/"
  },
  {
    title: "单机游戏",
    count: "999+",
    toPath: "/"
  },
  {
    title: "VLOG",
    toPath: "/"
  }
];
const link = [
  {
    title: "专栏",
    icon: "&#xe610;",
    toPath: "/",
    color: "#2EC3E5"
  },
  {
    title: "小黑屋",
    icon: "&#xe60a;",
    toPath: "/",
    color: "#FFD043"
  },
  {
    title: "活动",
    icon: "&#xe615;",
    toPath: "/",
    color: "#F39800"
  },
  {
    title: "直播",
    icon: "&#xe614;",
    toPath: "/",
    color: "#48CFE5"
  },
  {
    title: "专题",
    icon: "&#xe619;",
    toPath: "/",
    color: "#8FC31F"
  },
  {
    title: "赛事",
    icon: "&#xe686;",
    toPath: "/",
    color: "#F39800"
  }
];
export default {
  data() {
    return {
      primary, //主要的
      partition, //分区
      link
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../public.sass";
a {
  color: #333;
}
.wrapper {
  min-width: 1000px;
  max-width: 1400px;
  height: 68px;
  margin: 20px auto;
  display: flex;
}

.primary {
  display: flex;
  li {
    width: 50px;
    text-align: center;
    &:hover {
      span {
        color: $hoverColor;
      }
    }
  }
  span {
    font-size: 14px;
  }
}
.primary-div {
  width: 150px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 0 auto 4px;
  .iconfont {
    font-size: 28px;
    color: white;
    line-height: 36px;
  }
}
.table-line {
  border-left: 1px solid #e7e7e7;
  margin: 0 20px;
}

// 分区

.partition {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 68px;
  flex: 1;
  .partition-span {
    font-size: 14px;
    height: 34px;
    align-items: center;
    display: flex;
    span {
      text-align: center;
      align-items: baseline;
      display: flex;
      &:hover {
        color: $hoverColor;
      }
    }
  }

  em {
    background-color: #73c9e5;
    border-radius: 1px;
    font-size: 12px;
    transform: scale(0.85);
    margin: 0 1px;
    width: 32px;
    color: white;
  }
}
// --
.friendshipLink {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 68px;
  min-width: 220px;
  max-width: 242px;
  span {
    margin-left: 4px;
  }
  .link-div {
    display: flex;
    height: 34px;
    align-items: center;
    &:hover {
      span {
        color: $hoverColor;
      }
    }
  }
}
</style>
