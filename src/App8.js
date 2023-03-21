//ref
import React from 'react';
import './App.css';

//子组件
class TextInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'关童'
        }
    }
    show(){
        console.log("这是子组件的东西~")
    }
    render() {
        return(
            <div>
                <input type="text"/>
            </div>
        )
    }
}
//定义组件
class News extends  React.Component{
    //构造函数
    constructor(props){
        super(props);//表示继承
    }
    componentDidMount() {
        this.text.show();
    }

    render(){
        return(
            <div>
                <TextInput ref={(text)=>this.text=text}></TextInput>
            </div>
        )

    }
}
export default  News; //导出组件


