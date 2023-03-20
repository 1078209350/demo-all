import Home from './Home';
import User from './User';
import Login from './Login';
import PrivateRouter from './PrivateRouter';
import Profile from './Profile';
import UseList from "./UserList";
import UserAdd from "./UserAdd";
import UserDetail from "./UserDetail";
// let link=[
//     {
//
//     },
//     {
//
//     },
//     {
//
//     }
// ]
let router = [
    {
        to:"/home",
        name:'首页',
        path: '/home',//首页默认加载的页面
        ComponentName: Home,
    },
    {
        to:"/user",
        name:'学员管理',
        path: '/user',//后面是传递的参数id
        ComponentName: User,
        routes: [
            {
                path: '/user/list',
                ComponentName: UseList,
            },
            {
                path: '/user/add',
                ComponentName: UserAdd,
            },
            {
                path: '/user/detail/:id',
                ComponentName: UserDetail,
            }
        ]
    },
    {
        path: '/login',//首页默认加载的页面
        ComponentName: Login,
    },
    {
        to:"/profile",
        name:'个人设置',
        path: '/profile',//首页默认加载的页面
        ComponentName: PrivateRouter,
        component:Profile
    },
];

export  {router};
