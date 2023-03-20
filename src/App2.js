//ref转发
import React from 'react';
//子组件
const TextInput = React.forwardRef((props, ref) => (
    <div ref={ref}>
        <h1>这里是子组件~~~</h1>
        <h2>{props.children}</h2>
        <h3>{props.ref}</h3>
    </div>
));
// class TextInput extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             name:'关童'
//         };
//     }
//     render() {
//         return(
//             <div>
//                 <h1>这里是子组件~~~</h1>
//                 <h2>{this.props.children}</h2>
//             </div>
//         )
//     }
// }
//定义组件
class App2 extends  React.Component{
    //构造函数
    constructor(props){
        super(props);//表示继承
        const ref = React.createRef();
    }
    render(){
        return(
            <div>
                <TextInput ref="ref">hello</TextInput>
            </div>
        )

    }
}
export default  App2; //导出组件


