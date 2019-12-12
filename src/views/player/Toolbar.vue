<template>
  <div class="wrapper">
    <div class="ops">
      <div class="ops-item">
        <i class="iconfont">&#xe6e0;</i>
        <span>1241</span>
      </div>
      <div class="ops-item">
        <i class="iconfont">&#xe667;</i>
        <span>1241</span>
      </div>
      <div class="ops-item">
        <i class="iconfont">&#xe6ca;</i>
        <span>1241</span>
      </div>
      <div class="ops-item">
        <i class="iconfont">&#xe627;</i>
        <span>1241</span>
      </div>
    </div>
    <div class="appeal">
      稿件投诉
    </div>
  </div>
</template>

<script>
export default {
  name: "Toolbar"
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e9ef;
  display: flex;
}
.ops {
  display: flex;
  align-items: center;
  height: 30px;
  flex: 1;
  .ops-item {
    width: 90px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #00a1d6;
      i {
        color: #00a1d6;
      }
    }
  }
  span {
    width: 90px;
    font-size: 16px;
  }
  i {
    vertical-align: sub;
    font-size: 28px;
    margin-right: 5px;
    color: #757575;
  }
}
.appeal {
  margin-right: 7px;
  line-height: 30px;
  height: 30px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: #00a1d6;
  }
}
</style>
