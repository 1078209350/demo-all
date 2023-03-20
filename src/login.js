import React from 'react';
import './css/App.css';
//import fetchJson from 'fetch-json' ;
import axios from 'axios';
//import fetchJsonp from 'fetch-jsonp'
//定义组件
class Login extends  React.Component{
    //构造函数
    constructor(props){
        super(props);//表示继承
        this.state={
            valueName:'',
            valuePwd:'',
            display1:'block',
            display2:'none'
        }
    }
    getAxios(){
        // const url="/dingtalk_hec/modules/app/sys/app_login.svc";
        // const params={
        //     user_name:this.state.valueName,
        //     user_password:this.state.valuePwd
        // };
        // const handleData=(data)=>{
        //     console.log(data);
        //     if(data.success==true) {
        //         alert("登录成功！");
        //         this.setState({
        //             display1: 'none',
        //             display2: 'block'
        //         });
        //         this.props.handleClick('none', "block");
        //     }else{
        //         alert("登录失败！")
        //     }
        // }
        // fetchJson.get(url,params).then(handleData);


        axios({
            method: 'get',
            url: '/dingtalk_hec/modules/app/sys/app_login.svc',
            params: {
                user_name:this.state.valueName,
                user_password:this.state.valuePwd
            }
        })
        .then((value)=>{
            console.log(value)
          if(value.data.success==true){
              alert("登录成功！");
              this.setState({
                  display1:'none',
                  display2:'block'
              });
              this.props.handleClick('none',"block")
          }
        })
        .catch(function (reason) {
          console.log(reason);
        })


    }
    changeName(e){
        console.log(e.target.value)
        this.setState({
            valueName:e.target.value
        })
    }
    changePwd(e){
        this.setState({
            valuePwd:e.target.value
        })
    }



    render(){
        return(
            <div style={{display:this.state.display1}} className="login">
                <div>
                    <span style={{width:'70px',display:'inline-block'}}>用户名：</span><input className="inputtext" type="text" onChange={(e)=>this.changeName(e)} value={this.state.valueName}/>
                </div>
                <div style={{marginTop:'20px'}}>
                    <span style={{width:'70px',display:'inline-block'}}>密码：</span><input className="inputtext" type="text" onChange={(e)=>this.changePwd(e)} value={this.state.valuePwd}/>
                </div>
                <button style={{marginTop:'20px'}} onClick={()=>this.getAxios()}>登录</button>
            </div>
        )

    }
}
export default  Login; //导出组件


