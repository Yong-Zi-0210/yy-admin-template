const Layout = () => import("@/layout/index.vue");
export default [
  {
    path: "/usedCar",
    component: Layout,
    redirect: "/usedCar/agency",
    meta: { title: "二手车", svgIcon: "used-car" },
    children: [
      {
        path: "carInfo",
        component: () => import("@/views/usedCar/carInfo/index.vue"),
        name: "CarInfo",
        meta: {
          title: "车辆信息",
          svgIcon: "carInfo",
        },
      },
      {
        path: "communication",
        component: () => import("@/views/usedCar/communication/index.vue"),
        name: "Communication",
        meta: {
          title: "沟通管理",
          svgIcon: "communication",
        },
      },
      {
        path: "saleCar",
        component: () => import("@/views/usedCar/saleCar/index.vue"),
        name: "SaleCar",
        meta: {
          title: "卖车列表",
          svgIcon: "sale",
        },
      },
      {
        path: "dealer",
        component: () => import("@/views/usedCar/dealer/index.vue"),
        name: "Dealer",
        meta: {
          title: "经销商",
          svgIcon: "dealer",
        },
      },
    ],
  },
];
