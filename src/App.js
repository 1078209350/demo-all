import React from 'react';

import { connect } from 'react-redux';
import reducers from "./reducers"

import List from "./List";

class App1 extends React.Component{
  render() {
    return (
       <List list={this.props.list}></List>
    );
  }
}

// const mapStateToProps = function(reducers) {
//   return {
//     list: reducers.userState.list
//   };
// }

const App=connect(
    state=>({
      list:state.userReducer.list
    })
)(App1);

export default App;
