import React from "react";
import ParentComponent from './parentComponent'

export default class Test extends ParentComponent{
    constructor() {
        super();
        this.state={
            index: null,
            iindex:null
        }
        console.log(this.state);
    }

    handleMouseOver = (index ,iindex)=>{
        this.setState({
            index,
            iindex
        })
    }

    render() {
        const {index, iindex} = this.state;
        const arr = [
            {
                name:"关童",
                child:[
                    {
                        name:"关宝宝一号"
                    },
                    {
                        name:"关宝宝二号"
                    },
                    {
                        name:"关宝宝三号"
                    }
                ]
            },
            {
                name:"王玲家",
                child:[
                    {
                        name:"王宝宝一号"
                    },
                    {
                        name: "王宝宝二号"
                    }
                ]
            }
        ]
        return(
            <div>
                {
                    arr.map((item,aaa)=>{
                        return(
                            <div style={{fontSize:"22px", color:"red"}}>
                                {item.name}
                                {item.child.map((iitem,bbb)=>{
                                    return(
                                        <div style={{fontSize:'16px', color:'black', border:aaa===index&&bbb===iindex?'1px solid blue':null}}
                                             onMouseOver={()=>{this.handleMouseOver(aaa,bbb)}}
                                        >
                                            {iitem.name}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
