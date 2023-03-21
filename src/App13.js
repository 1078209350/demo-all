//高阶组件属性代理
import React from 'react';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <h4>hello Jason</h4>
                <h2>hello jsonp</h2>
                {this.props.children}
                <h1>{this.props.text}</h1>
            </div>

        )
    }
}
class Button extends React.Component {
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <Hello txt='6666' {...this.props}>
                <p>这是button组件里面的内容</p>
                <p>{this.props.children}</p>
            </Hello>

        )
    }
}
function WrapperHello(Comp) {
    return class WrapComp extends React.Component {
        componentDidMount(){
            console.log(this.props)
        }
        render() {
            const newProps = {
                text: "这是高级组件更改后的props"
            };

            return (
                <div>
                    <p>这是react高阶组件特有的元素</p>
                    <Comp {...this.props} {...newProps}>
                        <p>高级组件添加的东西</p>

                    </Comp>
                </div>
            )
        }
    }
}
let News = WrapperHello(Button);
class Best extends React.Component {

    render() {

        return (
             <News text="这是高级组件的props"></News>
        )
    }
}

export default  Best; //导出组件
