import React from 'react';
import {BrowserRouter,Route,NavLink,Redirect} from 'react-router-dom'
import Home from "./Home"
import User from "./User"
import Profile from "./Profile"
import PrivateRouter from "./PrivateRouter"
import Login from "./Login"
import TipButton from "./TipButton"
export default (
    <BrowserRouter>
        <div className="full-container">
            <div className="container">
                <TipButton />
            </div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="col-md-4">
                    <div className="navbar-brand">学校管理</div>
                </div>
                <div className="col-md-8">
                    <ul className="navbar-nav flex-row">
                        <li className="mx-3">
                            <NavLink className="nav-link" to="/home" activeClassName='active'>首页</NavLink>
                        </li>
                        <li className="mx-3">
                            <NavLink className="nav-link" to="/user" activeClassName='active'>学员管理</NavLink>
                        </li>
                        <li className="mx-3">
                            <NavLink className="nav-link" to="/profile" activeClassName='active'>个人设置</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="container mt-3">
            <Route path='/home' component={Home} />
            <Route path='/user' component={User} />
            <Route path='/login' component={Login} />
            <PrivateRouter path='/profile' component={Profile}></PrivateRouter>

        </div>
    </BrowserRouter>
)
