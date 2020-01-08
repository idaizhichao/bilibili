import Vue from "vue";
import Router from "vue-router";
import { BaseLayout } from "@/layout";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: BaseLayout,
      redirect: "/index",
      children: [
        {
          path: "/index",
          name: "index",
          component: () =>
            import(/* webpackChunkName: "index" */ "../views/index")
        },
        {
          path: "/player/av:aId",
          name: "player",
          component: () =>
            import(/* webpackChunkName: "player" */ "../views/player")
        },
        {
          path: "/video",
          name: "Video",
          component: () =>
            import(/* webpackChunkName: "player" */ "../views/player/Video")
        },
        {
          path: "/ranking/:tid",
          name: "Ranking",
          component: () =>
            import(/* webpackChunkName: "ranking" */ "../views/ranking")
        }
      ]
    }
  ]
});
