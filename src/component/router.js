import Home from './Home';
import About from './About';
import Info from './Info';
import Msg from './Msg';
let router = [
    {
        path: '/home',//首页默认加载的页面
        ComponentName: Home,
        exact: true //是否为严格模式
    },
    {
        path: '/about',//后面是传递的参数id
        ComponentName: About,
        routes: [
            {
                path: '/about/info',
                ComponentName: Info,
            },
            {
                path: '/about/msg',
                ComponentName: Msg
            },
        ]
    }
];

export default router;
