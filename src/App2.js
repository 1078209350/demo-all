//受控组件
import React from 'react';
import './App.css';
//定义组件
class News extends  React.Component{
    //构造函数
    constructor(props){
        super(props);//表示继承
        this.state={
            value:''
        }
    }
    handleInput(e){
        console.log(e.target.value);
        if(e.target.value.length<10){
            this.setState({
                value:e.target.value
            })
        }

    }
    render(){
        return(
            <div>
                    <input type="text" onInput={(e)=>this.handleInput(e)} value={this.state.value}/>
            </div>
        )

    }
}

//配合App12使用的Component
const Header =function () {
    console.log('function函数组件更新了')
    return(
        <div>
            <div>这是Header</div>
        </div>

    )
};
export default  Header; //导出组件


