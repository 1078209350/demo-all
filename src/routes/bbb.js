// bbb.js
import React, { Component } from 'react'
import { connect } from 'dva'

class BBB extends Component {
  render() {
    return (
      <div>
        <h1>这里是BBB</h1>
      </div>
    )
  }
}

BBB.propsTypes = {}
export default connect()(BBB)
