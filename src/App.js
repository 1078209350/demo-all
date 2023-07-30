import React from 'react';
import './App.css';
import {BrowserRouter,HashRouter,Route,Link,Switch} from "react-router-dom"
import reactDom from "react-dom"


const Home=()=>(
    <div>
      <h3>我是主页</h3>
    </div>
);
const About=()=>(
    <div>
      <h3>关于我们</h3>
    </div>
);
const Header=()=>(
    <ul>
      <li>
        <Link to="/">主页</Link>
      </li>
      <li>
        <Link to="/about">关于</Link>
      </li>
    </ul>
);
const Main=()=>(
    <div>
      <Switch>
        <Route exact path="/"  render={()=><h3>render形式的输出</h3>} />
        <Route path="/about"  component={About} />
      </Switch>

    </div>
)
//定义组件
class App extends  React.Component{
  render(){
    return(
        <BrowserRouter>
          <div>
            <Header></Header>
            <Main></Main >
          </div>
        </BrowserRouter>
    )
  }
}
export default  App; //导出组件

