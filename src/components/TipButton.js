import React from "react"
import auth from "../auth"
// withRouter的作用是render时会把match, location和history传入props
import {withRouter} from "react-router-dom"


class TipButton extends React.Component{

    componentDidMount() {
        let {history}=this.props;
    }

    render() {
        return <h3>jhhhh</h3>
    }


}



export default withRouter(TipButton)
