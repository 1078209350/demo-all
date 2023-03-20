import React from "react"
import {Route,NavLink,Switch,Redirect} from "react-router-dom"
import UseList from "./UserList"
import UserAdd from "./UserAdd"
import UserDetail from "./UserDetail"
class User extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let {match, routes} = this.props;
        console.log(match);
        console.log(routes)
        return(
            <div className="row">
                <div className="col-3">
                    <div className="nav text-center flex-column">
                        <li className="nav-item ">
                            <NavLink to={`${match.url}/list`} className="nav-link" activeClassName="bg-info text-light" >
                                用户列表
                            </NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to={`${match.url}/add`} className="nav-link" activeClassName="bg-info text-light">
                                新增用户
                            </NavLink>
                        </li>
                    </div>
                </div>
                <div className="col-9">
                    <Switch>
                        {
                            routes.map(({path, ComponentName},key) => {
                                return <Route
                                    key={key}
                                    path={path}
                                    component={ComponentName}
                                />
                            })
                        }
                        {/*<Route path='/user/list' component={UseList}></Route>*/}
                        {/*<Route path='/user/add' component={UserAdd}></Route>*/}
                        {/*<Route path='/user/detail/:id' component={UserDetail}></Route>*/}
                        {/*<Redirect from="/user" to="/user/list"></Redirect>*/}
                    </Switch>
                </div>
            </div>
        )
    }
}

export default User
