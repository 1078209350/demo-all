import React from 'react';
import fetchJsonp from "fetch-jsonp";
//import { connect } from 'react-redux';
import { createStore,combineReducers } from 'redux';


//所有的reducer
const initialListState = {
  list: []
};
const userReducer = function(state = initialListState, action) {
  switch(action.type) {
    case 'USER_LIST_SUCCESS':
      return Object.assign({}, state, { list: action.list });
  }
  return state;
};
const widgetReducer = function(state = initialListState, action) {
  switch(action.type) {
    case 'USER_LIST_FAIL':
      return Object.assign({}, state, { list: action.list });
  }
  return state;
};
//复合reducer
const reducers = combineReducers({
  userState: userReducer,
  widgetState: widgetReducer
});

// 建立一个 store 并把 reducer 传递进去 dispatch
const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[]
    }
  }
  getItems=()=> {
    let api="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20";
    fetchJsonp(api).then((res)=>{
      //这里对数据进行操作   默认的
      return res.json();
    }).then((res)=>{
      store.dispatch({
        type: 'USER_LIST_SUCCESS',
        list: res.result
      });
      this.setState({
        list:store.getState().userState.list
      })
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
              this.state.list.map((item,index)=>{
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


export default App;
