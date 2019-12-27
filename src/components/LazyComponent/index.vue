<template>
  <div ref="lazy" :style="`min-height: ' + $(height) + 'px`">
    <slot v-if="isShow" />
  </div>
</template>

<script>
export default {
  name: "LazyComponent",
  data() {
    return {
      isShow: false
    };
  },
  props: {
    height: {
      type: Number,
      default: 468
    }
  },
  mounted() {
    let _this = this;
    // 创建一个观察者
    let observer = new IntersectionObserver(onIntersection);
    let lazy = this.$refs.lazy;
    //监听 lazy 这个DOM 节点
    observer.observe(lazy);
    // 定义回调
    function onIntersection(entries) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          observer.unobserve(entry.target);
          console.log(entry.target);
          _this.isShow = true;
        }
      });
    }
  }
};
</script>

<style scoped></style>
