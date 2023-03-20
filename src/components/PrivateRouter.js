import React from "react";
import auth from "../auth";
import Login from "./Login"
import {Route,Redirect} from "react-router-dom"
class PrivateRouter extends React.Component{
    render() {
        let{component:Component,...rest}=this.props;
        //console.log(Component,rest)
        return (
            <Route {...rest} render={(props)=>(
                auth.isAuth?<Component {...props} />:
                <Redirect to={{
                    pathname:'./login',
                    state:{form:props.location}
                }} />
                //console.log(auth.isAuth)
            )}></Route>
        );
    }
}

export  default PrivateRouter
