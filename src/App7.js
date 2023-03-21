//context使用
import React from 'react';
import './App.css';
import PropTypes from 'prop-types'
class Title extends React.Component{
    static contextTypes = {
        color : PropTypes.string,
        handleChangeColor:PropTypes.func
    };
    render() {
        const color = this.context.color
        return(
            <h2 style={{color:color}}>你好</h2>
        )
    }
}
class Button extends React.Component{
    static contextTypes = {
        color : PropTypes.string,
        handleChangeColor:PropTypes.func
    };
    render() {
        const {handleChangeColor,color} = this.context;
        return(
            <div>
                <button style={{color:color}} type="button" onClick={()=>handleChangeColor('red')}>红色</button>
                <button style={{color:color}} type="button" onClick={()=>handleChangeColor('green')}>绿色</button>
            </div>
        )
    }
}
//定义组件
class News extends  React.Component{
    static childContextTypes = {
        color : PropTypes.string,
        handleChangeColor:PropTypes.func
    };
    constructor(){
        super()
        this.state={
            color:'red'
        }
    }
    handleChangeColor(color){
        this.setState({
            color:color
        })
    }
    getChildContext(){
        return{
            color:this.state.color,
            handleChangeColor:(color)=>this.handleChangeColor(color)
        }
    }
    render(){
        const color = this.context.color
        return(
            <div>
                <Title ></Title>
                <Button ></Button>
            </div>
        )
    }
}
export default  News; //导出组件


