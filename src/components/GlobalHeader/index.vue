<template>
  <div>
    <div class="bili-banner">
      <header class="header-content">
        <nav-link class="nav-link"></nav-link>
        <form-search class="form-search"></form-search>
        <user-link class="user-link"></user-link>
      </header>
    </div>
    <menu-list></menu-list>
  </div>
</template>

<script>
import FormSearch from "./FormSearch";
import UserLink from "./UserLink";
import NavLink from "./NavLink";
import MenuList from "./Menu";

export default {
  name: "GlobalHeader",
  components: {
    FormSearch,
    UserLink,
    NavLink,
    MenuList
  }
};
</script>

<style lang="scss" scoped>
.bili-banner {
  background-image: url("../../assets/banner-2019-11-22.png");
  background-color: #f9f9f9;
  min-height: 155px;
  height: 9.375vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 0;
}
.header-content {
  width: 100%;
  height: 56px;
  padding: 10px 24px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: space-between;
  .nav-link {
    margin-right: 5px;
  }
  .form-search {
    max-width: 500px;
    flex-grow: 1;
  }
}
</style>
