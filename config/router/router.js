const routes = [
  {
    path: "/",
    Component: "Home",
    key: 'home',
    exact: true,
    meta: {
      title: "主页",
    },
  },
  // {
  //   path: "/layout",
  //   components: [
  //     {
  //       path: '/layout/config',
  //       component: 'Layout',
  //     },
  //   ],
  // },
  {
    path: "/Header",
    Component: "Test/Header",
    key: 'header',
    exact: true,
    meta: {
      title: "回家吧",
    },
  },
  {
    path: "/main",
    Component: "Test/Main",
    key: 'main',
    // exact: true,
    meta: {
      title: "最主要的人",
    },
  },
  {
    path: "/company",
    Component: "Company",
    key: 'main',
    exact: true,
    meta: {
      title: "公司网站",
    },
  },
];

export default routes;
