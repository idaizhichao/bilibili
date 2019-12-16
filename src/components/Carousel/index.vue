<template>
  <div>
    <div class="banner">
      <carousel-item class="item" name="1">
        <template v-slot:content>
          <div class="box">1</div>
        </template>
      </carousel-item>
      <carousel-item class="item" name="2">
        <template v-slot:content>
          <div class="box">2</div>
        </template>
      </carousel-item>
      <carousel-item class="item" name="3">
        <template v-slot:content>
          <div class="box">3</div>
        </template>
      </carousel-item>
    </div>
    <button @click="handleClick">点我</button>
  </div>
</template>

<script>
import CarouselItem from "./CarouselItem";
export default {
  name: "Carousel",
  data() {
    return {};
  },
  components: {
    CarouselItem
  },
  methods: {
    handleClick(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.banner {
  width: 550px;
  height: 242px;
  position: relative;
  overflow: hidden;
  .item {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
