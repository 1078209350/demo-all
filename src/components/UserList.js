import React from 'react';
import {Link} from "react-router-dom"
export default class UserList extends React.Component{
    state={
        user:[]
    };
    componentWillMount() {
        //从缓存中取出数据
        let userStr=localStorage.getItem("users");
        let user=userStr?JSON.parse(userStr):[];

        this.setState({user})
    }

    render() {
        let {user}=this.state;
        return(
            <ul className="list-group">
                {
                    user.map((item,index)=>
                        <li key={item.id} className="list-group-item">
                            <Link to={`/user/detail/${item.id}`}>{item.name}</Link>
                        </li>
                    )
                }
            </ul>
        )
    }
}
