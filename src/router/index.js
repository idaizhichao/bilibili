import Vue from "vue";
import Router from "vue-router";
import { BaseLayout } from "@/layout";
Vue.use(Router);

export default new Router({
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
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "index" */ "../views/index")
        }
      ]
    }
  ]
});
