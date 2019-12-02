<template>
  <div>
    <global-header></global-header>
    <router-view></router-view>
    <footer>底部</footer>
  </div>
</template>

<script>
import { GlobalHeader } from "@/components";
export default {
  components: {
    GlobalHeader
  }
};
</script>

<style></style>
