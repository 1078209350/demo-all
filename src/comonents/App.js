import React from 'react';
import {BrowserRouter,HashRouter,Route,Link,Switch} from "react-router-dom"
import {Home} from './Home'
import {Music} from "./Music";
import reactDom from "react-dom"

//定义组件
class App extends  React.Component{
  render(){
    return(
        <BrowserRouter>
          <Switch>
            <Route exact path="/"  component={Home} />
            <Route exact path="/music"  component={Music} />
            <Route path="/render"  render={()=><h3>render形式的输出</h3>} />
          </Switch>
        </BrowserRouter>
    )
  }
}
export default App; //导出组件

