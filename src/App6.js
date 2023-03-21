//静态propTypes和默认标题defaultProps
import React from 'react';
import './App.css';
import PropTypes from 'prop-types'
class Title extends React.Component{
    static propTypes = {
        title:PropTypes.string
    }
    static defaultProps = {
        title:"这是默认标题"
    }
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div>{this.props.title}</div>
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
    render(){
        return(
            <div>
                <Title title={0}></Title>
            </div>
        )
    }
}
export default  News; //导出组件


