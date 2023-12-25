const Layout = () => import("@/layout/index.vue");
export default [
  {
    path: "/usedCar",
    component: Layout,
    redirect: "/usedCar/agency",
    meta: { title: "eshouche", svgIcon: "used-car" },
    children: [
      {
        path: "agency",
        component: () => import("@/views/usedCar/agency/index.vue"),
        name: "Agency",
        meta: {
          title: "jxshang",
          svgIcon: "",
        },
      },
      {
        path: "carInfo",
        component: () => import("@/views/usedCar/carInfo/index.vue"),
        name: "CarInfo",
        meta: {
          title: "clxinxi",
          svgIcon: "",
        },
      },
      {
        path: "communication",
        component: () => import("@/views/usedCar/communication/index.vue"),
        name: "Communication",
        meta: {
          title: "沟通",
          svgIcon: "communication",
        },
      },
    ],
  },
];
