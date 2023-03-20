import React from 'react';
import uuid from "uuid"
export default class UserAdd extends React.Component{
    handleSubmit=(e)=>{
        let name=this.inputName.value;
        let phone=this.inputPhone.value;
        //存到缓存中(localstorage)
        let useStr=localStorage.getItem("users" );
        let useArr=useStr?JSON.parse(useStr):[];

        useArr.push({
            id:uuid(),
            name,
            phone
        })
        localStorage.setItem("users",JSON.stringify(useArr));

        this.inputName.value="";
        this.inputPhone.value=""

        //跳转到用户列表
        this.props.history.push('/user/list');
        console.log(this.props)
        e.preventDefault()
    }
    render() {
        return(
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" ref={input=>this.inputName=input} className="form-control" placeholder="请输入姓名"/>
                </div>
                <div className="form-group">
                    <input type="number" ref={input=>this.inputPhone=input} className="form-control" placeholder="请输入电话"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">添加</button>
                </div>
            </form>

        )
    }
}
