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
          title: "企业",
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
        path: "hotUnit",
        component: () => import("@/views/recruitment/hotUnit/index.vue"),
        name: "HotUnit",
        meta: {
          title: "热门企业",
          svgIcon: "hot-unit",
        },
      },
      {
        path: "hotJob",
        component: () => import("@/views/recruitment/hotJob/index.vue"),
        name: "HotJob",
        meta: {
          title: "热招岗位",
          svgIcon: "hot-job",
        },
      },
      {
        path: "hotJobCate",
        component: () => import("@/views/recruitment/hotJobCategory/index.vue"),
        name: "HotJobCate",
        meta: {
          title: "热招岗位分类",
          svgIcon: "category",
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
      {
        path: "delivery",
        component: () => import("@/views/recruitment/delivery/index.vue"),
        name: "Delivery",
        meta: {
          title: "简历投递",
          svgIcon: "resume",
        },
      },
    ],
  },
];
