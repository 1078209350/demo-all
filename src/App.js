import React from 'react';
import './App.css';


// function Xx(){
//   return <p>这里是子组件!!!!</p>
// }
// let X=Xx();
//定义组件
class App extends  React.Component{
  //构造函数
  constructor(props){
    super(props);//表示继承
      this.handleClick = this.handleClick.bind(this);
    this.state={
      msg:'你好世界，我是一个新闻组件',
      imgAlt:"这是一个图片",
      list:['学习React.js','学习Vue.js','学习SpringBoot'],
      list2:[<li key='1'>学习SpringMVC</li>,<li key='2'>学习SpringCloud</li>,<li key='3'>学习SpringBoot</li>],
      list3:[
        {title:'时政新闻'},
        {title:'娱乐新闻'},
        {title:'军事新闻'}
      ],
      color:"red",
      // color:"true",
      class:"box-color1",
        id:'class'
    }
  }

    handleClick() {
        if(this.state.color==='red'){
            this.setState({
                color:'yellow'
            })
        }else{
            this.setState({color:'red'})
        }
     }

    classChange() {
        document.getElementById(this.state.id).setAttribute("class", "box-color2");
    }
    classback() {
        document.getElementById(this.state.id).setAttribute("class", "box-color1");
    }
    class(){
        if(document.getElementById(this.state.id).getAttribute("class")=='box-color1'){
            document.getElementById(this.state.id).setAttribute("class", "box-color2");
        }else{
            document.getElementById(this.state.id).setAttribute("class", "box-color1");
        }

    }

  render(){
    return(
        <div>
          {/*<X />*/}
          <div style={{'color':this.state.color}}>{this.state.msg}</div>
          {/*<div style={this.state.color?{color:'red'}:{color:'blue'}}>{this.state.msg}</div>*/}
            <button onClick={this.handleClick}>
                style改变颜色
            </button>
          <div id={this.state.id} className="box-color1">{this.state.msg}</div>
            <button onClick={this.classChange.bind(this)}>
                class改变颜色
            </button>
            <button onClick={()=>this.classback()}>
                class恢复颜色
            </button>
            <button onClick={()=>this.class()}>
                class一键切换
            </button>
          <br/>
          <br/>
          {/* 第二种方式：通过ES6的语法方式进行图片的引入 require */}
          <img src="http://img1.imgtn.bdimg.com/it/u=2174909441,2495215020&fm=26&gp=0.jpg" title={this.state.imgAlt} style={{'width':'500px'}}/>

          <ul>
            {this.state.list2}
          </ul>
          <br/>
          <ul>
            {
              this.state.list3.map(function (value,index) {
                return(<li key={index}>{value.title}</li>)
              })
            }
          </ul>
        </div>
    )

  }
}
export default  App; //导出组件
