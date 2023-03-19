import React from 'react';
import reactDom from "react-dom";
import {TransitionGroup,CSSTransition} from "react-transition-group";
import {BrowserRouter,HashRouter,Route,Link,NavLink,Switch,Redirect} from "react-router-dom"
import uuid from "uuid"
import "./App.css"
import 'animate.css';
const StuData={
    stuList:[
        {id:uuid(),name:'Tom',sex:'男',phone:156431346772},
        {id:uuid(),name:'Jerry',sex:'女',phone:156423423472},
        {id:uuid(),name:'Mary',sex:'女',phone:1421324352},
        {id:uuid(),name:'John',sex:'男',phone:16426546582},
        {id:uuid(),name:'Park',sex:'女',phone:5454562346772},
        {id:uuid(),name:'Love',sex:'男',phone:65465746772},
        {id:uuid(),name:'Server',sex:'男',phone:867842346772},

    ]
};
class StuInfo extends React.Component{

    handleClick=()=>{
       this.props.history.goBack();
    }
    render() {
        console.log(this.props);
        let id=this.props.match.params.id;
        let stuInfo=StuData.stuList.find((item)=>{
            return item.id===id
        });
        if(!stuInfo){
            this.props.history.push('/stu');
            return null;
        }
        return(
            <ul>
                <li>学生编号:{stuInfo.id}</li>
                <li>学生姓名:{stuInfo.name}</li>
                <li>学生性别:{stuInfo.sex}</li>
                <li>学生电话:{stuInfo.phone}</li>
                <li><button onClick={this.handleClick}>返回</button></li>
            </ul>
        )
    }


};
const StuMain=()=>(
    <ul>
        {
            StuData.stuList.map((item,index)=>
                <li key={item.id}>
                    <Link  to={`/stu/${item.id}`}>{item.name}</Link>
                </li>
            )
        }
    </ul>
);
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
const NotFound=()=>(
    <div>
        <h3>404</h3>
    </div>
);
const Stu=()=>(
    <div>
        <Switch>
            <Route exact path="/stu"  component={StuMain}  />
            <Route path="/stu/:id"  component={StuInfo} />
        </Switch>
    </div>
)
const Header=()=>(
    <ul>
      <li><NavLink to="/Home" activeClassName="active">主页</NavLink></li>
      <li><NavLink to="/about" activeClassName="active">关于</NavLink></li>
      <li><NavLink to="/stu" activeClassName="active">学生名单</NavLink></li>
    </ul>
);
const Main=()=>(
    <div>
        <TransitionGroup>
            <CSSTransition
                    key={Math.random()}
                    timeout={{
                        enter:500,
                        exit:0
                    }}
                    classNames={{
                        enter:'animated',
                        enterActive:'tada',
                        exit:'animated',
                        exitActive:'fadeOut'
                    }}
            >
                <Switch>
                    <Route path="/Home"  component={Home}  />
                    <Route path="/about"  component={About} />
                    <Route path="/stu"  component={Stu} />
                    <Redirect exact from="/" to="/home"></Redirect>
                    <Route component={NotFound} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
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

