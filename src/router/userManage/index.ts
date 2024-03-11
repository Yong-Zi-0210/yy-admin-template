const Layout = () => import("@/layout/index.vue");
export default [
  {
    path: "/userManage",
    component: Layout,
    redirect: "/userManage/userList",
    children: [
      {
        path: "/userList",
        name: "UserList",
        component: () => import("@/views/userManage/index.vue"),
        meta: { title: "用户列表", svgIcon: "user-manage" },
      },
    ],
  },
];
