import React from "react";
// import {Button} from 'choerodon-ui/pro';
// import classnames from 'classnames';
import styles from './index.less';

class Company extends React.Component {
  render(){
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img className={styles['company-logo']} src='https://sunnysmartlead.com/static/images/logo.svg' alt='' />
          <div className={styles['header-nav']}>
            <div className={styles['nav-item']}>首页</div>
            <div className={styles['nav-item']}>产品中心</div>
            <div className={styles['nav-item']}>关于我们</div>
            <div className={styles['nav-item']}>商务合作</div>
            <div className={styles['nav-item']}>新闻咨询</div>
            <div className={styles['nav-item']}>加入我们</div>
          </div>
          <div>
            111
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.advert}>
            <span className={styles['advert-desc']}>产品中心</span>
            <img className={styles['advert-img']} src='https://sunnysmartlead.com/static/images/product.png' alt='' />
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
