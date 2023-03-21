//兄弟间通讯
import React from 'react';
import './App.css';

class Title extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div style={{color:this.props.color}}>标题</div>
        )
    }
}

class Button extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <button style={{"color":this.props.color}} type="button" onClick={()=>{this.props.handleClick('red')}}>红色</button>
                <button style={{"color":this.props.color}} type="button" onClick={()=>{this.props.handleClick('green')}}>绿色</button>
            </div>
        )
    }
}
//定义组件
class News extends  React.Component{
    //构造函数
    constructor(props){
        super(props);//表示继承
        this.state={
            color:'green'
        }
    }
    handleClick(color){
        this.setState({
            color:color
        })
    }
    render(){
        return(
            <div>
                <Title color={this.state.color} handleClick={(color)=>this.handleClick(color)}></Title>
                <Button color={this.state.color} handleClick={(color)=>this.handleClick(color)}></Button>
            </div>
        )
    }
}
export default  News; //导出组件


