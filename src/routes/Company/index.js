import React from 'react';
import FirstPart from './Homepage/FirstPart';
import SecondPart from './Homepage/SecondPart';
import ThirdPart from './Homepage/ThirdPart';
import FourthPart from './Homepage/FourthPart';
import FifthPart from './Homepage/FifthPart';

import styles from './index.less';
import 'swiper/swiper-bundle.css';

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledBtn: true, // 第四部分左边按钮悬停是否隐藏
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            className={styles['company-logo']}
            src="https://sunnysmartlead.com/static/images/logo.svg"
            alt=""
          />
          <div className={styles['header-nav']}>
            <div className={styles['nav-item']}>首页</div>
            <div className={styles['nav-item']}>产品中心</div>
            <div className={styles['nav-item']}>关于我们</div>
            <div className={styles['nav-item']}>商务合作</div>
            <div className={styles['nav-item']}>新闻咨询</div>
            <div className={styles['nav-item']}>加入我们</div>
          </div>
          <div>111</div>
        </div>
        <div className={styles.content}>
          <FirstPart />
          <SecondPart />
          <ThirdPart />
          <FourthPart />
          <FifthPart />
        </div>
      </div>
    );
  }
}

export default Company;
