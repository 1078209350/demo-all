import React, { Component } from 'react';
import {BrowserRouter, HashRouter, Route, Link, NavLink, Switch, Redirect} from "react-router-dom";
import { Button } from 'choerodon-ui/pro';
import routes from "../config/router/router.js";

import './App.css';

class App extends Component {

  // componentWillMount() {
  //   if (this.props.location.pathname === "/") {
  //     this.props.history.push("/home");
  //   }
  //   this.props.history.listen((i) => {
  //     if (i.pathname === "/") {
  //       this.props.history.push("/home");
  //     }
  //   });

  // }

  render() {
    return (
        <div className="App">
          <NavLink to="/home" activeClassName="active">
            <Button color="primary">home页</Button>
          </NavLink>
          <NavLink to="/main" activeClassName="active">
            <Button color="primary">main页</Button>
          </NavLink>

          <Switch>
            {
              routes.map(({path, Component, exact = true, routes = []}, key) => {
                return (
<Route
                    exact={exact}
                    key={key}
                    path={path}
                    // component={componentName}
                    render={props => (
                        // 主要是为了传递嵌套路由到子组件
                        // 类似于 <User {...props} routes={routes} />
                        <Component {...props} routes={routes}/>
                    )}
                />
);
              })
            }
          </Switch>
        </div>
    );
  }
}


export default App;
