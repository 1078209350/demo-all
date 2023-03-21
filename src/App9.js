//高阶组件
import React from 'react';
import './App.css';

function CmHoc(Component) {     //高阶组件
    return class Mid extends React.Component{
        render() {
            return(
                <Component name="welcome" title="taian">
                    <p>欢迎来到美丽的泰安</p>
                </Component>
            )
        }
    }
}
class Children extends  React.Component{
    render(){
        return(
            <div {...this.props}>
                <h1>{this.props.name}</h1>
                {this.props.children}
            </div>
        )

    }
}
//let Hoc=CmHoc(Children);
export {Children,CmHoc}; //导出组件


