import React from 'react';
import PropTypes from 'prop-types'
class Button extends React.Component{
    static contextTypes = {
        color : PropTypes.string,
        handleChangeColor:PropTypes.func
    };
    componentDidMount() {
        console.log(this.context)
    }

    render() {
        const {handleChangeColor,color} = this.context;
        return(
            <div>
                <button style={{color:color}} type="button" onClick={()=>handleChangeColor('red')}>红色</button>
                <button style={{color:color}} type="button" onClick={()=>handleChangeColor('green')}>绿色</button>
            </div>
        )
    }
}
export default  Button; //导出组件
