const Layout = () => import("@/layout/index.vue");
export default [
  {
    path: "/recommend",
    component: Layout,
    redirect: "/recommend/recList",
    children: [
      {
        path: "/recList",
        name: "RecList",
        component: () => import("@/views/recommend/index.vue"),
        meta: { title: "推荐位", svgIcon: "recommend" },
      },
    ],
  },
];
