import React  from 'react';
import PropTypes from 'prop-types'
import Button from "./Button";
import Title from "./Title";
class App extends  React.Component{
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
        return(
            <div>
                <Title ></Title>
                <Button ></Button>
            </div>
        )
    }
}
export default  App; //导出组件
