const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/category",
    meta: { title: "商品", svgIcon: "goods" },
    children: [
      {
        path: "category",
        component: () => import("@/views/goods/category/index.vue"),
        name: "Category",
        meta: {
          title: "商品分类",
          svgIcon: "goods-category",
        },
      },
      {
        path: "manage",
        component: () => import("@/views/goods/manage/index.vue"),
        name: "Manage",
        meta: {
          title: "商品管理",
          svgIcon: "goods-manage",
        },
      },
      {
        path: "brands",
        component: () => import("@/views/goods/brands/index.vue"),
        name: "Brands",
        meta: {
          title: "商品品牌",
          svgIcon: "brands",
        },
      },
      {
        path: "order",
        component: () => import("@/views/goods/order/index.vue"),
        name: "Order",
        meta: {
          title: "商品订单",
          svgIcon: "order",
        },
      },
    ],
  },
];
