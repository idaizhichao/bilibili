<template>
  <div>
    <user-card
      :top="top"
      :left="left"
      v-if="isUserCard"
      @userCard="handleUserCard"
      :member="member"
    >
    </user-card>
    <div class="card-box" v-for="replyItem in replies" :key="replyItem.rpid">
      <div
        class="user-face"
        @mouseenter="handleMouseenter(replyItem.member.mid, $event)"
        @mouseleave="handleMouseleave"
      >
        <a href="#">
          <img
            :src="`${replyItem.member.avatar}@52w_52h.webp`"
            :onerror="`this.src='${replyItem.member.avatar}'`"
          />
        </a>
      </div>
      <div class="user">
        <div class="name">
          <a
            href="#"
            :class="
              `username ${
                replyItem.member.vip.vipType !== 0 ? 'vip-red-name' : ''
              }`
            "
          >
            {{ replyItem.member.uname }}
          </a>
          <a class="level">
            <svg class="svg-icon" aria-hidden="true">
              <use
                :xlink:href="
                  `#icon-ic_userlevel_${replyItem.member.level_info.current_level}`
                "
              />
            </svg>
          </a>
          <a href="#" class="nameplate">
            <img
              :src="replyItem.member.nameplate.image_small"
              :title="replyItem.member.nameplate.name"
            />
          </a>
        </div>
        <p class="text" v-html="transilation(replyItem.content.message)"></p>
        <div class="info">
          <span class="plad info-between">来自<a href="#">安卓客户端</a> </span>
          <span class="time info-between">{{
            replyItem.ctime | timeStamp
          }}</span>
          <span class="like info-between"
            ><i class="iconfont">&#xe6c6;</i>{{ replyItem.like }}</span
          >
          <span class="hate info-between"
            ><i class="iconfont">&#xe6c5;</i></span
          >
          <span class="reply info-between">回复</span>
        </div>
        <div class="reply-box">
          <div
            class="reply-item"
            v-for="item in replyItem.replies"
            :key="item.rpid"
          >
            <div class="reply">
              <a herf="#">
                <img
                  @mouseenter="handleMouseenter(item.member.mid, $event)"
                  @mouseleave="handleMouseleave"
                  class="reply-pic"
                  :src="`${item.member.avatar}@52w_52h.webp`"
                  :onerror="`this.src='${replyItem.member.avatar}'`"
                />
              </a>
              <div class="user-text">
                <a
                  href="#"
                  :class="
                    `username ${
                      item.member.vip.vipType !== 0 ? 'vip-red-name' : ''
                    }`
                  "
                  >{{ item.member.uname }}</a
                >
                <svg class="svg-icon level" aria-hidden="true">
                  <use
                    :xlink:href="
                      `#icon-ic_userlevel_${item.member.level_info.current_level}`
                    "
                  />
                </svg>
                <span
                  class="reply-text"
                  v-html="transilation(item.content.message)"
                />
              </div>
            </div>
            <div class="info">
              <span class="time info-between">
                {{ item.ctime | timeStamp }}
              </span>
              <span class="like info-between"
                ><i class="iconfont">&#xe6c6;</i>{{ item.like }}</span
              >
              <span class="hate info-between"
                ><i class="iconfont">&#xe6c5;</i></span
              >
              <span class="reply info-between">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/js/svg-icon";
import { up } from "@/api";
import moment from "moment";

import UserCard from "@/components/UserCard";
export default {
  name: "Reply",
  components: {
    UserCard
  },
  props: {
    replies: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      top: 0,
      left: 0,
      isUserCard: false,
      member: {},
      mid: undefined
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
    transilation(value) {
      let exp = /['\n']/g;
      let x = value.replace(exp, "<br/>");
      return x;
    },
    handleMouseenter(mid, e) {
      this.isUserCard = true;
      this.top = e.pageY - e.offsetY + e.target.offsetHeight;
      this.left = e.pageX - e.offsetX;
      if (this.mid !== mid) {
        this.mid = mid;
        this.getCardInfo(mid);
      }
    },
    handleMouseleave() {
      this.isUserCard = false;
    },
    getCardInfo(mid) {
      up.getCardInfo(mid).then(res => {
        this.member = res.data;
      });
    },
    handleUserCard(type) {
      this.isUserCard = type;
    }
  }
};
</script>

<style lang="scss" scoped>
.level {
  margin-right: 4px;
}
.svg-icon {
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.card-box {
  padding: 22px 0 14px;
  box-sizing: border-box;
  display: flex;
  .user-face {
    cursor: pointer;
    height: 48px;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }
  .user {
    flex: 1;
    margin-left: 20px;
    border-bottom: 1px solid #e5e9ef;
  }
  .name {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    .username {
      color: #6d757a;
      margin-right: 4px;
    }
  }
  .text {
    margin: 5px 0;
    font-size: 14px;
  }
}
.info {
  line-height: 26px;
  display: flex;
  align-items: center;
  height: 26px;
  margin-bottom: 5px;
  color: #999;
  a {
    color: #999;
  }
  .info-between {
    margin-right: 8px;
  }
  i {
    margin-right: 3px;
  }
  .like {
    cursor: pointer;
    i {
      vertical-align: bottom;
    }
  }
  .hate {
    cursor: pointer;
    vertical-align: unset;
  }
  .reply {
    cursor: pointer;
  }
}
.reply-pic {
  width: 24px;
  height: 24px;
  margin-right: 7px;
}
.reply {
  display: flex;
  .username {
    margin-right: 4px;
    color: #6d757a;
    transition: all 0.3s;
    vertical-align: super;
    &:hover {
      color: #00a1d6;
    }
  }
  .user-text {
    display: inline-block;
  }
  .reply-text {
    vertical-align: super;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
    flex: 1;
  }
}
.nameplate {
  img {
    width: 32px;
    height: 32px;
  }
}
.vip-red-name {
  color: #fb7299 !important;
}

.level {
  margin-right: 4px;
  vertical-align: sub;
}
</style>
