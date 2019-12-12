<template>
  <div class="card-box">
    <div class="user-face">
      <img
        src="//i2.hdslb.com/bfs/face/2148fbc6a5668b167f542f60fe2fd47f87e8a6f3.jpg@52w_52h.webp"
      />
    </div>
    <div class="user">
      <div class="name">
        <a href="#">
          貳貮贰
        </a>
      </div>
      <p class="text">期待你做一个视频，水晶上限是多少</p>
      <div class="info">
        <span class="plad info-between">来自<a href="#">安卓客户端</a> </span>
        <span class="time info-between">2018-11-04 09:56</span>
        <span class="like info-between"><i class="iconfont">&#xe6c6;</i>4</span>
        <span class="hate info-between"><i class="iconfont">&#xe6c5;</i>1</span>
        <span class="reply info-between">回复</span>
      </div>
      <div class="reply-box">
        <div class="reply-item">
          <div class="reply">
            <a herf="#" class="reply-pic">
              <img
                src="//i0.hdslb.com/bfs/face/92d69b6053f3f918342baff34213d4c489af4083.jpg@52w_52h.webp"
              />
            </a>
            <div class="user-text">
              <a href="#" class="username">小卖部的深渊</a
              ><span class="reply-text"
                >不是灵魂觉醒的比如鬼凯赤翎也缺金币缺的不像话</span
              >
            </div>
          </div>
          <div class="info">
            <span class="time info-between">2018-11-04 09:56</span>
            <span class="like info-between"
              ><i class="iconfont">&#xe6c6;</i>4</span
            >
            <span class="hate info-between"
              ><i class="iconfont">&#xe6c5;</i>1</span
            >
            <span class="reply info-between">回复</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }
  .user {
    flex: 1;
    margin-left: 10px;
    border-bottom: 1px solid #e5e9ef;
  }
  .name {
    margin-bottom: 5px;
  }
  .text {
    margin: 5px 0;
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
  margin-right: 4px;
}
.reply {
  display: flex;
  align-items: center;
  line-height: 24px;
  height: 24px;
  .username {
    margin-right: 4px;
    color: #6d757a;
    transition: all 0.3s;
    &:hover {
      color: #00a1d6;
    }
  }
  .reply-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
  }
}
</style>
