//高阶组件反向集成
import React from 'react';

function WrapperHello(Comp) {
    class WrapComp extends Comp {
        componentDidMount() {
            console.log('反向代理高阶组件新增的生命周期,加载完成')
            console.log(this.props)
        }
        render() {
            return <Comp {...this.props} time={123}></Comp>
        }
    }
    return WrapComp;
}
//@WrapperHello
class Hello extends React.Component {
    componentDidMount() {
        console.log('组件加载完成');
        console.log(this.props)
    }
    render() {
        return <h4>hello Jason</h4>
    }
}
let News = WrapperHello(Hello)
export default  News; //导出组件
