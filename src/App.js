//最新版context API使用
import React  from 'react';
import App1 from "./App1";
//import Title from "./Title";
//export const ThemeContext = React.createContext("默认名称");
export const {Provider,Consumer} = React.createContext("默认名称");
//总的组件
class App extends  React.Component{
    state={
        a:1,
        b:2
    };
  render(){
    return(
        <Provider value={2313}>
            <App1></App1>
        </Provider>
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
//     render() {
//         return(
//             <div>
//                 <ThemeContext.Consumer>{(value)=>
//                     <div>
//                         <h2>{value}</h2>
//                         <button>nihao</button>
//                     </div>
//
//                 }</ThemeContext.Consumer>
//             </div>
//         )
//     }
// }
export default  App; //导出组件
