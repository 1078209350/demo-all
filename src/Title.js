//最新版context API使用
import React from 'react';
import {ThemeContext} from "./Manage";//引入父组件的Consumer容器
class Title extends React.Component{
    componentDidMount() {
        console.log(this.context)
    }
    static contextType = ThemeContext;
    render() {
        return(
            <div>
                <h2>{this.context}</h2>
                <button>nihao</button>
            </div>
        )
    }
}
export default  Title; //导出组件
