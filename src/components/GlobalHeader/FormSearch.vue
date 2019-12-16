<template>
  <div>
    <form class="nav-search-from" v-if="this.device === 'desktop'">
      <input type="text" class="nav-search-input" placeholder="啦啦啦" />
      <div class="nav-search-btn">
        <button><i class="iconfont button-search">&#xe647;</i></button>
      </div>
    </form>
    <div
      class="tabled-search"
      v-if="this.device === 'tablet' || this.device === 'mobile'"
    >
      <a href="#"><i class="iconfont button-search">&#xe647;</i></a>
    </div>
  </div>
</template>

<script>
import "../../assets/icon/iconfont.css";
import { AppDeviceEnquire, mixinDevice } from "@/utils/mixin";

export default {
  name: "FormSearch",
  mixins: [AppDeviceEnquire, mixinDevice]
};
</script>

<style lang="scss" scoped>
button {
  outline: none;
}
.button-search {
  font-size: 35px;
}
.tabled-search {
  display: flex;
  justify-content: flex-end;
}
.nav-search-from {
  width: 100%;
  display: block;
  background-color: #fff;
  border: 1px solid hsla(0, 0%, 100%, 0);
  border-radius: 2px;
  padding: 0 38px 0 16px;
  box-sizing: border-box;
  position: relative;
  .nav-search-input {
    box-sizing: border-box;
    border: none;
    width: 100%;
    height: 34px;
    line-height: 34px;
    color: #999;
    font-size: 14px;
    overflow: hidden;
    outline: none;
  }
  .nav-search-btn {
    position: absolute;
    right: 0;
    top: -1px;
    button {
      box-sizing: border-box;
      width: 48px;
      height: 36px;
      line-height: 36px;
      border: 0;
      &:hover {
        cursor: pointer;
      }
    }

    &:hover {
      .button-search {
        color: #00a1d6;
      }
    }

    &:click {
      outline: none;
    }
  }

  .nav-search-btn:focus {
    outline: none;
  }
}
</style>
