import Home from "@src/routes/Test/Home";
import Main from "@src/routes/Test/Main";

let routes = [
  {
    path: "/home",
    Component: Home,
    exact: true,
    meta: {
      title: "回家吧",
    },
  },
  {
    path: "/main",
    Component: Main,
    // exact: true,
    meta: {
      title: "最主要的人",
    },
  }
];

export default routes;
