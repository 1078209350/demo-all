import React from 'react';
import './css/App.css';
import axios from "axios";
//import axios from 'axios';
//import fetchJsonp from 'fetch-jsonp'
//定义组件
class List extends  React.Component{
    //构造函数
    constructor(props){
        super(props);//表示继承
        this.state={
            value:'',
            list:[],
            border:"1px solid #000"
        }
    }
    lookList(){
        axios.get('/dingtalk_hec/autocrud/app.exp.app_exp_report_main_query/query')
            .then((value)=>{
                this.setState({
                    list:value.data.result.record
                })
                console.log(this.state.list);
            })
            .catch(function (reason) {
                console.log(reason);
            })


    }
    render(){
        return(
            <div style={{display:this.props.display2}} className="list">
                <div style={{width:"500px"}}>
                    {
                        this.state.list.map((value,index)=> {
                            return(
                                <div key={index} style={{marginTop:'20px',border:this.state.border,borderRadius:"10px",padding:'10px'}}>
                                    <div style={{display:"flex",justifyContent:'space-between'}}>
                                        <div>{value.report_date}</div>
                                        <div>{value.exp_report_number}</div>
                                    </div>
                                    <div style={{fontWeight:'bold'}}>{value.unit_name}</div>
                                    <div>备注：{value.description}</div>
                                    <div style={{display:"flex",justifyContent:'space-between'}}>
                                        <div style={{color:"#6675CB"}}>{value.report_status_name}</div>
                                        <div>¥{value.total_payment_amount}</div>
                                    </div>
                                    <div style={{display:"flex",justifyContent:'flex-end'}}>
                                        <div style={{color:"#6675CB"}}>¥{value.total_paid_amount}（已付）</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )

    }
}
export default  List; //导出组件


