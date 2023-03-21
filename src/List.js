import React from "react";
import store from "./index";
import fetchJsonp from "fetch-jsonp";



class List extends React.Component{
    getItems=()=> {
        let api="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20";
        fetchJsonp(api).then((res)=>{
            //这里对数据进行操作   默认的
            return res.json();
        }).then((res)=>{
            console.log(res)
            store.dispatch({
                type: 'USER_LIST_SUCCESS',
                list: res.result
            });
        }).catch((err)=>{
            console.log(err);
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.getItems}>你是</button>
                <div>
                    {
                        //console.log(this.props)
                        this.props.list.map((item,index)=>{
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
        );
    }
}
export  default List
