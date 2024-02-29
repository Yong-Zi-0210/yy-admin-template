import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import usedCar from "./usedCar";
import recruitment from "./recruitment";
import goods from "./goods";
import recommend from "./recommend";

const Layout = () => import("@/layout/index.vue");
export const constantRoutes: RouteRecordRaw[] = [];
export const asyncRoutes: RouteRecordRaw[] = [];
// const whiteList = ["/login"];

// 固定路由
const routers: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
        meta: {
          title: "首页",
          svgIcon: "home",
        },
      },
    ],
  },
  ...recommend,
  ...usedCar,
  ...recruitment,
  ...goods,
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/:pathMatch(.*)*", // 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});
/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    // 删除动态添加的路由
    // router.getRoutes().forEach((route) => {
    //   const { name } = route;
    //   if (name && !whiteList.includes(name as string)) {
    //     router.hasRoute(name) && router.removeRoute(name);
    //   }
    // });
    router.push("/login");
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload();
  }
}

export default router;
