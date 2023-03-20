//ref的三种定义
import React from 'react';
//子组件
class TextInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'关童'
    };
  }
  show(){
    console.log("这是子组件的东西~")
  }
  render() {
    return(
        <div>
          <h1>这里是子组件~~~</h1>
        </div>
    )
  }
}
class ChildInput extends React.Component{
  constructor(props){
    super(props);
  }
  show(){
    console.log("这是Child组件的东西~")
  }
  render() {
    return(
        <div>
          <h1>这里是子组件~~~</h1>
        </div>
    )
  }
}
//定义组件
class News extends  React.Component{
  //构造函数
  constructor(props){
    super(props);//表示继承
    this.state={
      value:""
    }
    this.myRef = React.createRef();
    this.childRef = React.createRef();
  }
  componentDidMount() {
    //this.text.show();
    //console.log(this.callbackRef.value)
    //console.log(this.myRef.current.value)
    this.childRef.current.show();
  }
  onChange(){
    this.setState({
      value:this.refs.stringRef.value
    })
    //console.log(this.refs.stringRef.value);
  }
  render(){
    return(
        <div>
          <input ref="stringRef" type="text" onChange={()=>this.onChange()} value={this.state.value}/>
          <input ref={(callbackRef)=>this.callbackRef=callbackRef} value="123321" type="text"/>
          <input ref={this.myRef} value="Hello world" type="text"/>
          <TextInput ref={(text)=>this.text=text}></TextInput>
          <ChildInput ref={this.childRef} ></ChildInput>
        </div>
    )

  }
}
export default  News; //导出组件


