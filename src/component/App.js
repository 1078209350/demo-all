import React from 'react';
import {BrowserRouter} from "react-router-dom"
import Header from "./Header"
import Main from "./Main"
//定义组件
class App extends  React.Component{
    render(){
        return(
            <BrowserRouter>
                <Header></Header>
                <Main></Main >
            </BrowserRouter>
        )
    }
}
export default  App; //导出组件
