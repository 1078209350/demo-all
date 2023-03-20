import React from 'react';
import './css/App.css';
//import axios from 'axios';
import fetchJsonp from 'fetch-jsonp'
import Login from './login.js'
import List from './list.js'
//定义组件
class News extends  React.Component{
  //构造函数
  constructor(props){
    super(props);//表示继承
    this.state={
      value:'',
      display1:'block',
        display2:'none'
    }
  }
    handleClick(display1,display2){
        this.setState({
            display1:display1,
            display2:display2
        })
        this.text.lookList();
    }
  render(){
    return(
        <div>
            <Login  handleClick={(display1,display2)=>this.handleClick(display1,display2)}></Login>
            <List ref={(text)=>this.text=text} display2={this.state.display2} handleClick={(display1,display2)=>this.handleClick(display1,display2)}></List>
        </div>
    )

  }
}
export default  News; //导出组件


