//react中class和style的命名规范
import React from 'react';
import './App.css';
//再定义一个用于引入
class Test extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        console.log('class组件更新了')
        return(
            <div>
                <div style={{color:"white",background:"black"}}>这是使用class创建的导航条</div>
                <div onClick={()=>this.setState({})}>点击我查看更新</div>
            </div>


        )
    }
}
//使用函数的方法渲染

const Test2 =function () {
    console.log('function函数组件更新了')
    return(
        <div>
            <div style={{color:"white",background:"pink"}}>这是使用function创建的导航条</div>
        </div>

    )
};


//定义组件
class News extends  React.Component{
    //构造函数
    constructor(props){
        super(props);//表示继承
        this.state={
            msg:'你好世界，我是一个新闻组件',
        }
    }
    render(){
        console.log('News组件更新了')
        return(
            <div>
                <Test />
                <Test2 />
                <div>{this.state.msg}</div>

            </div>
        )

    }
}
export default  {News,Test,Test2}; //导出组件


