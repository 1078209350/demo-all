import React from "react";
import { NavLink } from "react-router-dom";
import {Button} from 'choerodon-ui/pro';
import classnames from 'classnames';
import styles from './home.less';

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
          <NavLink to="/company" activeClassName="active">
            <Button color="primary">公司网站</Button>
          </NavLink>
        </div>

        <div className={classnames(styles.animated, styles.animatedFadeInUp, styles.fadeInUp)}>
          <h1>is easy.</h1>
        </div>
        <div className={classnames(styles.animated, styles.animatedFadeInUp, styles.fadeInUp)}>
          <h2>Search</h2>
          <p>Know what you want to listen to? Just search and hit play.</p>
        </div>
        <div className={classnames(styles.animated, styles.animatedFadeInUp, styles.fadeInUp)}>
          <h2>Browse</h2>
          <p>Check out the latest charts, brand new releases and great playlists for right now.</p>
        </div>
        <div className={classnames(styles.animated, styles.animatedFadeInUp, styles.fadeInUp)}>
          <h2>Discover</h2>
          <p>Enjoy new music every Monday with your own personal playlist. Or sit back and enjoy Radio.</p>
        </div>
      </>
    );
  }
}

export default Home;
