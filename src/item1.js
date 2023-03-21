import React from 'react';
class Item1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arr1:[],
            arr2:[]
        }

    }

    submit(index,value){
        delete this.props.arr1[index];
        this.setState({
            arr1:this.props.arr1,
            arr2:[...this.props.arr2,value]
        });
        this.props.getArr1Callback(this.props.arr1,this.props.arr2.concat(value))
    }

    delSub(index){
        delete this.props.arr1[index];
        this.setState({
            arr1:this.props.arr1
        });
    }
    render() {
        return(
            <div style={{height:'200px'}}>
                {
                    this.props.arr1.map(function (value,index) {
                        return(
                            <div id={index} style={{display:"flex",justifyContent:'space-between'}} key={index}>
                                <div style={{display:"flex"}}>
                                    <input type="checkbox" onChange={()=>this.submit(index,value)} id={"checkboxone"+index} />
                                    <li  style={{padding:0,margin:0,'listStyle':'none'}}>{value}</li>
                                </div>
                                <div style={{display:"flex"}}>
                                    <button style={{marginRight:"10px"}} onClick={()=>this.submit(index,value)} className="button">提交</button>
                                    <button onClick={()=>this.delSub(index)}  className="button">删除</button>
                                </div>
                            </div>
                        )
                    },this)
                }
            </div>
        )
    }
}
export default Item1
