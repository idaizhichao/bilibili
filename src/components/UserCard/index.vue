<template>
  <div
    class="card"
    :style="`left:${left}px; top: ${top}px`"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div
      class="bg"
      :style="`background-image:url(${member.space.s_img}@750w_240h.webp)`"
    ></div>
    <a href="#" class="face">
      <img :src="`${member.card.face}@50w_50h.webp`" />
    </a>
    <div class="info">
      <p class="user-name">
        <a
          href="#"
          :class="
            `username ${member.card.vip.vipType !== 0 ? 'vip-red-name' : ''}`
          "
        >
          {{ member.card.name }}</a
        >
        <a href="#" class="nameplate">
          <img
            :src="member.card.nameplate.image_small"
            :title="member.card.nameplate.name"
          />
        </a>
        <a>
          <svg class="svg-icon" aria-hidden="true">
            <use
              :xlink:href="
                `'#icon-ic_userlevel_${member.card.level_info.current_level}`
              "
            />
          </svg>
        </a>
      </p>
      <p class="social">
        <span>关注: {{ member.card.friend }}</span>
        <span>粉丝: {{ member.card.fans }}</span>
      </p>
      <p class="sign">
        {{ member.card.sign }}
      </p>
    </div>
    <div class="btn-class">
      <span class="following default-btn">关注</span>
      <span class="message default-btn">发送消息</span>
    </div>
  </div>
</template>

<script>
import "@/assets/js/svg-icon";

export default {
  name: "UserCard",
  props: {
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    member: {
      type: Object,
      default: () => {
        return {
          card: {
            level_info: {
              current_level: 1
            }
          },
          space: {
            s_img:
              "//i1.hdslb.com/bfs/space/718eac8c71e29b8a80431c46110805c3a40e30a6.jpg"
          }
        };
      }
    }
  },
  methods: {
    handleMouseenter() {
      this.$parent.handleUserCard(true);
    },
    handleMouseleave() {
      this.$parent.handleUserCard(false);
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  transition: show 0.2s;
  padding: 15px 20px;
  width: 375px;
  box-sizing: border-box;
  position: absolute;
  z-index: 1000;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
}
.face {
  position: absolute;
  top: 100px;
  img {
    border-radius: 50%;
  }
}
.bg {
  left: 0;
  top: 0;
  width: 375px;
  height: 120px;
  background-size: 100%;
  position: absolute;
  border-radius: 4px;
}
.info {
  padding: 105px 0px 19px 65px;
  .user-name {
    margin: 12px 0;
    font-size: 13px;
  }
}
.sign {
  margin-top: 10px;
  color: #99a2aa;
}
.social {
  font-size: 12px;
}
.social span:nth-child(2) {
  margin-left: 15px;
}
.btn-class {
  padding-left: 65px;
  .default-btn {
    cursor: pointer;
    padding: 4px 20px;
    border-radius: 2px;
    margin-right: 10px;
  }
  .following {
    border: 1px solid #00a1d6;
    background-color: #00a1d6;
    color: white;
    &:hover {
      border-color: #00b5e5;
      background-color: #00b5e5;
      color: #fff;
    }
  }
  .message {
    border: 1px solid #bbb;
    color: #aaa;
    &:hover {
      border: 1px solid #00a1d6;
      color: #00a1d6;
    }
  }
}
.username {
  color: #6d757a;
  transition: all 0.3s;
  vertical-align: super;
  &:hover {
    color: #00a1d6;
  }
}
.vip-red-name {
  color: #fb7299 !important;
}
.svg-icon {
  width: 1.3rem;
  height: 1.3rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.nameplate {
  img {
    width: 28px;
    height: 28px;
    margin: 0 4px;
  }
}
</style>
