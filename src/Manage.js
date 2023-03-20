//最新版context API使用
import React, {createContext}  from 'react';
import App1 from "./App1";
import Title from "./Title";
export const ThemeContext  = React.createContext("默认名称");
//统一管理状态
class Manage extends React.Component{
    state={
        a:1,
        b:2
    };
    render() {
        return(

            <ThemeContext.Provider value={2313}>
                <App1></App1>
             </ThemeContext.Provider>
        )
    }
}
// class App1 extends React.Component{
//     render() {
//         return(
//             <div>
//                 <Title></Title>
//             </div>
//         )
//     }
// }
// class Title extends React.Component{
//     componentDidMount() {
//         console.log(this.context)
//     }
//
//     static contextType = ThemeContext;
//     render() {
//         return(
//             <div>
//
//                 <h2>{this.context}</h2>
//                 <button>nihao</button>
//
//             </div>
//         )
//     }
// }
export default  Manage; //导出组件
