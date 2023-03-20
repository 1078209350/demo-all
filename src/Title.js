//最新版context API使用
import React  from 'react';
import {Consumer} from "./App";//引入父组件的Consumer容器
class Title extends React.Component{
    render() {
        return(
            <div>
                <Consumer>
                    {(value)=>
                    <div>
                        <h2>{value}</h2>
                        <button>nihao</button>
                    </div>}
                </Consumer>
            </div>
        )
    }
}
export default  Title; //导出组件
