const Layout = () => import("@/layout/index.vue");
export default [
  {
    path: "/recruitment",
    component: Layout,
    redirect: "/recruitment/unit",
    meta: { title: "招聘", svgIcon: "recruitment" },
    children: [
      {
        path: "unit",
        component: () => import("@/views/recruitment/unit/index.vue"),
        name: "Unit",
        meta: {
          title: "单位",
          svgIcon: "unit",
        },
      },
      {
        path: "job",
        component: () => import("@/views/recruitment/job/index.vue"),
        name: "Job",
        meta: {
          title: "岗位",
          svgIcon: "job",
        },
      },
      {
        path: "clickManage",
        component: () => import("@/views/recruitment/clickManage/index.vue"),
        name: "ClickManage",
        meta: {
          title: "点击管理",
          svgIcon: "click-manage",
        },
      },
    ],
  },
];
