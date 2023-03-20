import React from "react";

export default class ParentComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name:'我不信这样可以',
            age:24,
            color: 'green'
        }
    }
    render() {
        return(
            <div>
                这里是父组件
            </div>
        )
    }
}
