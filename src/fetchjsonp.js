import React from 'react';
import './css/App.css';
import fetchJsonp from 'fetch-jsonp'
//定义组件
class Jsonp extends  React.Component{
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
        let api="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20";
        fetchJsonp(api).then((res)=>{
            //这里对数据进行操作   默认的
            return res.json();
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });
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
export default  Jsonp; //导出组件


