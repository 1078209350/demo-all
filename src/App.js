import React from 'react';
import './css/App.css';
//import './css/bootstrap.min.css';
import storage from  './storage'
import Item1 from './item1'
import Item2 from './item2'

//定义组件
class App extends  React.Component{
  //构造函数
  constructor(props){
    super(props);//表示继承
    this.handleClick = this.handleClick.bind(this);
    this.state={
      arr1:[],
      arr2:[],
      display:''
    }
  }

  handleClick() {
    if(this.state.color==='red'){
      this.setState({
        color:'yellow'
      })
    }else{
      this.setState({color:'red'});
      localStorage.setItem('arr',this.state.arr);
    }
  }


  add(){
    var value=this.refs.input.value;
    console.log(value);
    if(value===null||value===''){
      alert("输入值不能为空")
      return
    }
    this.setState({
      arr1:this.state.arr1.concat(value)
    })
    storage.set("arr",this.state.arr1.concat(value))
  }


  //判断点击的键盘的keyCode是否为13，是就调用上面的搜索函数
  handleEnterKey = (e) => {
    if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
      this.add();
      //this.storage(this.state.arr)

    }
  }



  //生命周期
  componentWillMount(){
    var todolist=storage.get('arr');
    console.log(todolist);
    // if(localStorage.length!==0){
    //   let list=localStorage.getItem("arr");
    //   list=list.split(",")
    //   this.setState({
    //     list:list
    //   })
    // }

  }
  getArr1Callback(arr1,arr2){
    this.setState({
      arr1:arr1,
      arr2:arr2,
    })
  }
  getArr2Callback(arr1,arr2){
    this.setState({
      arr1:arr1,
      arr2:arr2,
    })
  }

  render(){
    //let _this=this;
    return(
        <div style={{width:'1000px',margin:"50px auto 0 auto",textAlign:"center"}}>
          <div>
            <h2>请输入要添加的事项：</h2>
            <input type="text" ref="input" onKeyPress={this.handleEnterKey} className="inputtext"/>
            <button onClick={()=>this.add()} className="button">添加</button>
          </div>
          <div style={{float:"left",width:'450px'}}>
            <h2>未提交的待办事项</h2>
            <Item1 arr1={this.state.arr1} arr2={this.state.arr2} getArr1Callback={(arr1,arr2)=>this.getArr1Callback(arr1,arr2)}></Item1>
          </div>
          <div style={{float:"right",width:'450px'}}>
            <h2>已提交的待办事项</h2>
            <Item2 arr1={this.state.arr1} arr2={this.state.arr2} getArr2Callback={(arr1,arr2)=>this.getArr2Callback(arr1,arr2)}></Item2>
          </div>

        </div>
    )

  }
}
export default  App; //导出组件
