import React from 'react';
import PropTypes from 'prop-types'
class Title extends React.Component{
    static contextTypes = {
        color : PropTypes.string,
        handleChangeColor:PropTypes.func
    };
    render() {
        const color = this.context.color
        return(
            <h2 style={{color:color}}>你好</h2>
        )
    }
}
export default  Title; //导出组件
