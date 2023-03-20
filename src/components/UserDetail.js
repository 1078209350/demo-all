import React from 'react';

export default class UserDetail extends React.Component{
    render() {
        let {id}=this.props.match.params;
        let userStr=localStorage.getItem("users")
        let users=userStr?JSON.parse(userStr):[];
        let user=users.find((item)=>item.id===id);
        console.log(user)
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>名字</th>
                        <th>电话</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
