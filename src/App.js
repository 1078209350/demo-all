import React from 'react'
import {connect} from "react-redux"
import {addState} from "./reducers/getState";
import {getAges} from "./action/action"

class App extends React.Component{
  constructor(props){
    super(props)
  }
    go = () => {
        this.props.getAges()           // 发起action，传入参数
    }
    render() {
        return (
            <div>
                这是username组件
                <br/>
                <button onClick={this.go}>
                    点击获取提交age
                </button>
                <div>
                    {

                        //console.log(this.props.getState)
                        this.props.getState.list.map((item,index)=>{
                            return(
                                <ul key={index}>
                                    <li>{item.aid}</li>
                                    <li>{item.username}</li>
                                    <li>{item.title}</li>
                                </ul>
                            )
                        })
                    }
                </div>


            </div>
        )
    }

}
export default connect(
    state=>({
        getState:state.getState,
        cutState:state.cutState
    }),
    {getAges}
)(App)
