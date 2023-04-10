import React from "react";
import { NavLink } from "react-router-dom";
import {Button} from 'choerodon-ui/pro';

class Home extends React.Component {
  render(){
    return (
      <>
        <div title="首页" />

        <div>
          <NavLink to="/home" activeClassName="active">
            <Button color="primary">页面布局配置</Button>
          </NavLink>
          <NavLink to="/main" activeClassName="active">
            <Button color="primary">main页</Button>
          </NavLink>
        </div>
      </>
);
  }
}

export default Home;
