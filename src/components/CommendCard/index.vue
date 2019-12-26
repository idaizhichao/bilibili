<template>
  <div class="l-con-box">
    <div class="con-image">
      <a :href="'/player/av' + data.aid" class="fenmian" target="_blank">
        <img :src="imageUseHttps(data.pic, '@206w_116h_1c_100q.webp')" />
        <div class="count">
          <div class="left">
            <div>
              <i class="iconfont">&#xe666;</i>
              <span>{{ data.stat.view | number }}</span>
            </div>
            <div>
              <i class="iconfont zan">&#xe6e0;</i>
              <span>{{ data.stat.like | number }}</span>
            </div>
          </div>
          <div class="right">{{ data.duration | time }}</div>
        </div>
        <p href="#" class="con-title fontHover" :title="data.title">
          {{ data.title }}
        </p>
        <div
          @mousemove="handleMousemove(data.cid, $event)"
          :style="'background-position:' + width + 'px ' + height + 'px; '"
          class="preview"
        >
          <div class="progress-bar">
            <span :style="'width:' + progress + '%'"></span>
          </div>
        </div>
      </a>
    </div>
    <a class="con-author fontHover" href="#"
      ><i class="iconfont">&#xe665;</i>{{ data.owner.name }}</a
    >
  </div>
</template>

<script>
export default {
  name: "CommendCard",
  props: {
    data: Object,
    require
  },
  data() {
    return {
      progress: 0,
      height: 0,
      width: 0
    };
  },
  methods: {
    handleMousemove(cid, el) {
      if (
        !el.target.style.backgroundImage &&
        el.target.className === "preview"
      ) {
        console.log(el.target.className);
        el.target.style.backgroundImage =
          'url("https://i0.hdslb.com/bfs/videoshot/' + cid + '.jpg@.webp")';
      }
      const value = el.offsetX / el.toElement.scrollWidth;
      const progress = parseFloat(value).toFixed(2) * 100;
      let number = Math.round(progress / 5) - 1;
      this.progress = progress;
      if (number < 10) {
        this.width = -number * 206;
        this.height = 10;
      } else {
        if (number === 10) {
          this.width = 0;
          this.height = -105.875;
          return;
        }
        this.width = (20 - number - 10) * 206;
        this.height = -105.875;
      }
    },
    imageUseHttps(src, webp = "") {
      return src.replace("http://", "https://") + webp;
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #333;
}

.l-con {
  display: flex;
  justify-content: space-between;
}

.l-con-box {
  width: 206px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
}

.con-title {
  font-size: 14px;
  line-height: 20px;
  margin: 10px 0 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.con-image {
  position: relative;
  width: 100%;
  height: 116px;

  .fenmian {
    height: 100%;
    z-index: 1;
    width: 100%;
    display: block;
    position: relative;

    &:hover {
      .preview {
        transition: opacity 0.5s;
        opacity: 1;
        z-index: 2;
      }

      .count {
        opacity: 0;
      }
    }

    img {
      border-radius: 2px;
    }

    &::before {
      content: "";
      width: 100%;
      height: 48px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAAGnNCAXAAAABGdBTUEAALGPC/xhBQAAAENJREFUCB1jYGBgYGICEpIgQgqNBRRi4MMmARYDyXKAWLwgggfOAnMJiIH0soJ0sMEJdlQWWBYshpAAK0ZwwSzS1AEAes8Ckyqvlc0AAAAASUVORK5CYII);
    }
  }

  .count {
    display: flex;
    transition: opacity 0.2s;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 6px 8px;
    font-size: 13px;
    position: absolute;
    bottom: 0;
    z-index: 11;
    color: white;
    opacity: 1;

    .left {
      display: flex;
      height: 16px;
      line-height: 16px;
      align-items: center;

      div {
        display: flex;
        justify-content: center;
        margin-right: 6px;

        i {
          margin-right: 3px;
        }

        .zan {
          font-size: 15px;
        }
      }
    }
  }
}

.con-author {
  display: flex;
  margin-top: 60px;
  color: #999;
  font-size: 12px;
  line-height: 16px;

  i {
    margin-right: 4px;
  }

  &:visited {
    color: #999;
  }
}

.preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 116px;
  opacity: 0;
  overflow: hidden;
  background-size: 2060px;

  .progress-bar {
    width: 100%;
    height: 10px;
    padding: 4px 8px;
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    border: 1px solid #000;
    background: #444;

    span {
      display: block;
      background-color: #fff;
      width: 99%;
      display: block;
      height: 2px;
    }
  }
}
</style>
