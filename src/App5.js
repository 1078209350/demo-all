//生命周期
import React from 'react';
import './App.css';
//定义组件
class News extends  React.Component{
    //构造函数
    constructor(props){
        console.log("constructor")
        super(props);//表示继承
    }
    //加载
    x() {
        console.log("组件将要加载componentWillMount")
    }
    componentDidMount() {
        console.log("组件已经加载componentDidMount")
    }
    //更新生命周期
    componentWillReceiveProps(nextProps, nextContext) {
        console.log("组件将要接收参数  componentWillReceiveProps")
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("组件是否应该更新  shouldComponentUpdate")
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("组件将要更新  componentWillUpdate")
    }
    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     console.log("在更新前获取截图  getSnapshotBeforeUpdate")
    // }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("组件已经更新完毕  componentDidUpdate")
    }
    //卸载
    componentWillUnmount() {
        console.log("组件将要卸载  componentWillUnmount")
    }

    render(){
        console.log("render")
        return(
            <div>
                <div>您好</div>
                <button type="button" onClick={()=>this.setstate({})}>setstate更新</button>
                <button type="button" onClick={()=>this.forceUpdate({})}>forceUpdate更新</button>
            </div>

        )

    }
}
export default  News; //导出组件


