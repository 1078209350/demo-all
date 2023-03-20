import React from 'react';
import {BrowserRouter,HashRouter,Route,Link,NavLink,Switch,Redirect} from "react-router-dom"
const Header=()=>(
    <ul>
        <li><NavLink to="/home" activeClassName="active">主页</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">关于</NavLink></li>
    </ul>
);
export default Header
