import React, {Component} from 'react';
import { Route, Switch} from "react-router-dom";
import routes from "../config/router/router.js";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      routesNew: [],
    };
  }

  async componentDidMount () {
    // 处理routes
    let routesNew = routes.map(async(item)=>{
      const component = await import(`@src/routes/${item.Component}`);
      const B = component.default;
      // eslint-disable-next-line no-param-reassign
      item.Component = B;
      return item;
    });
    routesNew = await Promise.all(routesNew);
    this.setState({
      routesNew,
    });
  }

  render() {
    return (
      <div>
        <Switch>
           {
            // eslint-disable-next-line no-shadow
            this.state.routesNew.map(({path, Component, Components, exact = true}) => {
              return (
                  <Route
                      exact={exact}
                      key={path}
                      path={path}
                      // component={componentName}
                      render={props => {
                        // 判断当前得路由对象是否存在子路由
                        if(Components){ // 存在路由嵌套    递归函数
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          return <Component {...props} routes={Components}/>;
                        }else{ // 不存在路由嵌套
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          return <Component {...props}/>;
                        }

                      }}
                  />
              );
            })
           }
        </Switch>
      </div>
    );
  }
};

export default App;
