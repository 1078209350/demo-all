import React from "react";
// import {Button} from 'choerodon-ui/pro';
import classnames from 'classnames';
import advert1 from '@public/company/advert1.mov';
import advert2 from '@public/company/advert2.png';
import advert3 from '@public/company/advert3.png';
import styles from './index.less';


class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advertOrder: 2,
    };
  }

  componentDidMount() {
    // setInterval(()=>{
    //   const { advertOrder } = this.state;
    //   if (advertOrder === 3) {
    //     this.setState({
    //       advertOrder: 1,
    //     });
    //   } else {
    //     this.setState({
    //       advertOrder: advertOrder + 1,
    //     });
    //   }
    // }, 3000);
  }

  render(){
    const {advertOrder} = this.state;
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
          <div className={styles.advert} style={{visibility: advertOrder === 1? 'visible': 'hidden', zIndex: advertOrder === 1? 99: 0}}>
            <div className={classnames(styles['advert-desc'], styles.animated, styles.animatedFadeInUp, styles.fadeInUp)} style={{display: advertOrder === 1? 'flex': 'none'}}>
              <div className={classnames(styles.noselect)}>————————————</div>
              <div style={{marginLeft: '10px'}}>
                <p className={classnames(styles.noselect, styles.desc1)}>愿景</p>
                <p className={classnames(styles.noselect, styles.desc2)}>成为全球智能驾驶领域的领军企业</p>
                <button type='button' className={styles['desc-btn']} onClick={()=>{console.log(111111);}}>了解我们</button>
              </div>
            </div>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video width="100%" src={advert1} type="video/mp4" controls autoPlay="autoplay" loop muted />
          </div>
          <div className={styles.advert} style={{visibility: advertOrder === 2? 'visible': 'hidden', zIndex: advertOrder === 2? 99: 0}} >
            <div className={classnames(styles['advert-desc'], styles.animated, styles.animatedFadeInUp, styles.fadeInUp)} style={{display: advertOrder === 2? 'flex': 'none'}}>
              <div className={classnames(styles.noselect)}>————————————</div>
              <div style={{marginLeft: '10px'}}>
                <p className={classnames(styles.noselect, styles.desc1)}>全球首颗量产8M前视感知模组</p>
                <p className={classnames(styles.noselect, styles.desc2)}>看得更远、更清、更广、更加安全</p>
                <button type='button' className={styles['desc-btn']} onClick={()=>{console.log(111111);}}>了解我们</button>
              </div>
            </div>
            <div className={styles['advert-bar-item1']} />
            <div className={styles['advert-bar-item2']} />
            <div className={styles['advert-bar-item3']} />

            <img className={styles['advert-img']} src={advert2} alt='' />
          </div>
          <div className={styles.advert} style={{visibility: advertOrder === 3? 'visible': 'hidden', zIndex: advertOrder === 3? 99: 0}} >
            <div className={classnames(styles['advert-desc'], styles.animated, styles.animatedFadeInUp, styles.fadeInUp)} style={{display: advertOrder === 3? 'flex': 'none'}}>
              <div className={classnames(styles.noselect)}>————————————</div>
              <div style={{marginLeft: '10px'}}>
                <p className={classnames(styles.noselect, styles.desc1)}>使命</p>
                <p className={classnames(styles.noselect, styles.desc2)}>专注汽车安全，呵护人类生命</p>
                <button type='button' className={styles['desc-btn']} onClick={()=>{console.log(111111);}}>了解我们</button>
              </div>
            </div>
            <img className={styles['advert-img']} src={advert3} alt='' />
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
