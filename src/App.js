import React from 'react';
import { createStore,applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducers from "./reducer/reducers"
import addReducer from "./reducer/addReducer";
import cutReducer from "./reducer/cutReducer";

// 建立一个 store 并把 reducer 传递进去 dispatch
const store = createStore(reducers,applyMiddleware(thunk) );


class App extends React.Component{
  constructor(props){
    super(props);
    this.state=store.getState();
    store.subscribe(this.gengxin);
  }
    gengxin=()=>{
        this.setState(store.getState());
        console.log(this.state);
    }
    addItems=()=> {
      let num=this.state.a;
      store.dispatch({
          type:'ADD_NUM',
          result:num+1
      })
      // this.setState({
      //     addReducer:  store.getState().addReducer
      // })
  }

  cutItems=()=> {
      const x=function(){
          return {
              type:'CUT_NUM',
              result:1
          }
      }
      store.dispatch(
          function (dispatch){
            setTimeout(()=>{
                dispatch(x())
            },1000)
          }
      )
      // this.setState({
      //     cutReducer:  store.getState().cutReducer
      // })
  }

  render() {
      console.log('sdsjdkshdskhdksjh');
    return (
        <div>
          <button onClick={this.addItems}>添加</button>
          <button onClick={this.cutItems}>减少</button>
          <div>
            增加{this.state.a}
            <hr/>
              减少{this.state.b}
          </div>
        </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('被更新',store.getState());
  }
}


export default App;
