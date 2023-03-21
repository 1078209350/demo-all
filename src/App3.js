//prop父给子传值
import React from 'react';
import './App.css';

//再定义一个用于引入
class Button extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        console.log('class组件更新了')
        return(
            <div>
                <button type="button">
                    {this.props.name}
                </button>
            </div>


        )
    }
}
//使用函数的方法渲染
const Test2 =function (props) {
    console.log('function函数组件更新了')
    return(
        <div>
            <div style={{color:"white",background:"pink"}}>
                {props.title}
                {props.children}
            </div>
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
            content:[<li key='1'>学习SpringMVC</li>,<li key='2'>学习SpringCloud</li>,<li key='3'>学习SpringBoot</li>],
        }
    }
    render(){
        console.log('News组件更新了')
        return(
            <div>
                <Test2 title={"标题"}>
                    <h3>这是一个传递的children</h3>
                    <h3>这是一个传递的children2</h3>
                    <Button name="我是按钮一"></Button>
                    <Button name="我是按钮二"></Button>
                </Test2>
                <div>{this.state.msg}</div>
                <span dangerouslySetInnerHTML={{__html: this.state.content}}></span>
            </div>
        )

    }
}
export default  News; //导出组件


