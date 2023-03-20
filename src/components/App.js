import React from 'react';
import {BrowserRouter,Route,NavLink,Redirect} from 'react-router-dom'
import {link,router} from "./router"
//import TipButton from "TipButton"
export default (
    <BrowserRouter>
        <div className="full-container">
            <div className="container">
                {/*<TipButton></TipButton>*/}
            </div>
            <nav className="navbar navbar-dark bg-info">
                <div className="col-md-4">
                    <div className="navbar-brand">后台管理系统</div>
                </div>
                <div className="col-md-8">
                    <ul className="navbar-nav flex-row">
                        {
                            router.map(({to,name})=>{
                                return(
                                    <li className="mx-5">
                                        <NavLink className="nav-link" to={to} activeClassName='active'>{name}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>
        </div>
        <div className="container mt-3">
            {
                router.map(({path, ComponentName,component,routes = []},key) => {
                    return <Route
                        key={key}
                        path={path}
                        //component={componentName}
                        render={props => (
                            //主要是为了传递嵌套路由到子组件
                            //类似于 <User {...props} routes={routes} />
                            <ComponentName {...props} component={component} routes={routes}/>
                        )}
                    />
                })
            }
            {/*<Route path='/home' component={Home} />*/}
            {/*<Route path='/user' component={User} />*/}
            {/*<Route path='/login' component={Login} />*/}
            {/*<PrivateRouter path='/profile' component={Profile}></PrivateRouter>*/}

        </div>
    </BrowserRouter>
)
