import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter("number", value => {
  if (value < 10000) {
    return value;
  } else {
    return (value / 10000).toFixed(1) + "万";
  }
});
Vue.filter("time", value => {
  let seconds = value % 60;
  let branch = Math.floor(value / 60);
  let hour = Math.floor(branch / 60);
  branch >= 60 ? (branch %= 60) : branch;
  if (value < 60) {
    seconds = ("0" + value).slice(-2);
    return "00:" + seconds;
  }
  let result = "";
  if (hour > 0) {
    result += hour + ":";
  }
  if (branch > 0) {
    branch = ("0" + branch).slice(-2);
    seconds = ("0" + seconds).slice(-2);
    result += branch + ":" + seconds;
  }
  return result;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
