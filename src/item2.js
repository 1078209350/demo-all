import React from 'react';
class Item2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arr1:[],
            arr2:[]
        }

    }
    cancel(index,value){
        delete this.props.arr2[index];
        this.setState({
            arr2:this.props.arr2,
            arr1:[...this.props.arr1,value]
        });
        this.props.getArr2Callback(this.props.arr1.concat(value),this.props.arr2)
    }

    delCan(index){
        delete this.props.arr2[index];
        this.setState({
            arr2:this.props.arr2
        });
    }
    render() {
        return(
            <div>
                {
                    this.props.arr2.map(function (value,index) {
                        return(
                            <div id={"cancel"+index} style={{display:"flex",justifyContent:'space-between'}} key={index}>
                                <div style={{display:"flex"}}>
                                    <input type="checkbox" onChange={()=>this.cancel(index,value)} id={"checkboxtwo"+index} checked/>
                                    <li  style={{padding:0,margin:0,'listStyle':'none'}}>{value}</li>
                                </div>
                                <div style={{display:"flex"}}>
                                    <button style={{"marginRight":"10px"}} onClick={()=>this.cancel(index,value)}  className="button">取消</button>
                                    <button onClick={()=>this.delCan(index)}  className="button">删除</button>
                                </div>
                            </div>
                        )
                    },this)
                }
            </div>
        )
    }
}
export default Item2
