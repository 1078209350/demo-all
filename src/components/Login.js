import React from "react";
import auth from "../auth"
import {Redirect} from "react-router-dom"
class Login extends React.Component{
    state = {
        isRedirectBack:false
    };
    login=()=>{
        auth.autoLogin(()=>{
            this.setState({
                isRedirectBack:true
            })
        })
    };
    render() {
        let{form}=this.props.location.state ||{form:{pathname:'/home'}};       //获取来源
        let{isRedirectBack}=this.state;
        if(isRedirectBack){
            return <Redirect to={form}></Redirect>
        }
        //console.log(this.props);
        return (
            <div>
               <h3>请您登录!</h3>
                <button className="btn btn-primary" onClick={this.login}>登录</button>
            </div>
        );
    }
}

export default Login
