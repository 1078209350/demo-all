import React from "react";
import { Bind } from 'lodash-decorators';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel, Pagination } from 'swiper/core'; // 引入核心插件和自动播放组件
// import {Button} from 'choerodon-ui/pro';
import classnames from 'classnames';
import advert1 from '@public/company/advert1.mov';
import advert2 from '@public/company/advert2.png';
import advert3 from '@public/company/advert3.png';
import contentThird from '@public/company/contentThird.mp4';

import pro1 from '@public/company/pro1.png';
import pro2 from '@public/company/pro2.png';
import pro3 from '@public/company/pro3.png';
import pro4 from '@public/company/pro4.png';
import pro5 from '@public/company/pro5.png';
import pro6 from '@public/company/pro6.png';
import pro7 from '@public/company/pro7.png';
import pro8 from '@public/company/pro8.png';
import pro9 from '@public/company/pro9.png';
import pro10 from '@public/company/pro10.png';
import pro11 from '@public/company/pro11.png';
import pro12 from '@public/company/pro12.png';
import pro13 from '@public/company/pro13.png';
import pro14 from '@public/company/pro14.png';

import styles from './index.less';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Mousewheel, Pagination]); // 使用插件，插件名放入[]中，这一行是重点

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advertOrder: 1,
    };
  }

  componentDidMount() {
    setInterval(()=>{
      const { advertOrder } = this.state;
      if (advertOrder === 3) {
        this.setState({
          advertOrder: 1,
        });
      } else {
        this.setState({
          advertOrder: advertOrder + 1,
        });
      }
    }, 3000);

    // const a = new Swiper('.swiper', {
    //   mousewheel: true,
    // });
  }

  // 阻止video默认点击事件
  @Bind()
  cancelHandle (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  @Bind()
  handleAdvertBarItem1 () {
    console.log(2222);
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
          <div className={styles['content-first']}>
            <div className={styles.advert} style={{visibility: advertOrder === 1? 'visible': 'hidden', zIndex: advertOrder === 1? 99: 0}}>
              <div className={classnames(styles['advert-desc'], styles.animated, styles.animatedFadeInUp, styles.fadeInUp)} style={{display: advertOrder === 1? 'flex': 'none'}}>
                <div className={classnames(styles.noselect)}>————————————</div>
                <div style={{marginLeft: '10px'}}>
                  <p className={classnames(styles.noselect, styles.desc1)}>愿景</p>
                  <p className={classnames(styles.noselect, styles.desc2)}>成为全球智能驾驶领域的领军企业</p>
                  <button type='button' className={styles['desc-btn']} onClick={()=>{console.log(111111);}}>了解我们</button>
                </div>
              </div>
              <div className={classnames(styles['advert-bar'])}>
                <div className={styles['advert-bar-item1']} onClick={this.handleAdvertBarItem1} ><div className={styles['bar-item1']} /></div>
                <div className={styles['advert-bar-item2']} ><div className={styles['bar-item2']} /></div>
                <div className={styles['advert-bar-item3']} ><div className={styles['bar-item3']} /></div>
              </div>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video width="100%" src={advert1} type="video/mp4" controls autoPlay="autoplay" loop muted onClick={this.cancelHandle} />
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
              <div className={classnames(styles['advert-bar'])}>
                <div className={styles['advert-bar-item1']} onClick={this.handleAdvertBarItem1} ><div className={styles['bar-item1']} /></div>
                <div className={styles['advert-bar-item2']} ><div className={styles['bar-item2']} /></div>
                <div className={styles['advert-bar-item3']} ><div className={styles['bar-item3']} /></div>
              </div>
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
              <div className={classnames(styles['advert-bar'])}>
                <div className={styles['advert-bar-item1']} onClick={this.handleAdvertBarItem1} ><div className={styles['bar-item1']} /></div>
                <div className={styles['advert-bar-item2']} ><div className={styles['bar-item2']} /></div>
                <div className={styles['advert-bar-item3']} ><div className={styles['bar-item3']} /></div>
              </div>
              <img className={styles['advert-img']} src={advert3} alt='' />
            </div>
            {/* 放一个元素撑高父元素 */}
            <div style={{visibility: 'hidden'}} >
              <img style={{width: '100%'}} src={advert3} alt='' />
            </div>
          </div>
          <div className={styles['content-second']}>
            <h1 className={styles.title}>赋能高阶自动驾驶，为客户增值</h1>
            <div style={{width: '100%', height: '600px', textAlign: 'center'}}>
              <Swiper
                style={{width: '100%', height: '600px'}}
                direction="vertical"
                authHeight="true"
                speed={0} // 修改为0ms
                mousewheel={{
                  releaseOnEdges: true, // 当Swiper处于边缘位置时（第一个或最后一个slide），Swiper释放鼠标滚轮事件，鼠标可以控制页面滚动。
                  thresholdTime: 300, // 鼠标滚轮滚动时间阈值，当你鼠标滚动太快，两次滚动之间时间小于该阈值时，swiper无法切换
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {
                  [pro1, pro2, pro3, pro4, pro5, pro6, pro7, pro8, pro9, pro10, pro11, pro12, pro13, pro14].map(item =>(
                    <SwiperSlide><img style={{height: '100%'}} src={item} alt='' /></SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
          </div>
          <div className={styles['content-third']} style={{width: '100%', height: '500px'}}>
            <div style={{width: '45%', height: '100%', background: 'red'}}>
              <Swiper
                style={{width: '100%', height: '600px'}}
                direction="vertical"
                authHeight="true"
                speed={0} // 修改为0ms
                mousewheel={{
                  releaseOnEdges: true, // 当Swiper处于边缘位置时（第一个或最后一个slide），Swiper释放鼠标滚轮事件，鼠标可以控制页面滚动。
                  thresholdTime: 300, // 鼠标滚轮滚动时间阈值，当你鼠标滚动太快，两次滚动之间时间小于该阈值时，swiper无法切换
                }}
                pagination={{
                  el: '.swiper-pagination',
                  type: 'custom',
                  renderCustom: (swiper, current, total) => {
                    return (
                      <div className="swiper-pagination">
                        <span className="swiper-pagination-bullet">{current}</span>
                      </div>

                    );
                  },
                  clickable: true,
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <div>
                    <h1>环境感知</h1>
                    <span>包含前视单目、多目、周视摄像模组；应用于机器视觉的视觉数据采集输入，实现高级驾驶辅助等</span>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <h1>显像感知</h1>
                    <span>包含电子侧视盲区监测摄像模组、电子流媒体后视摄像模组等；应用于侧视盲区监测，后视流媒体识别等</span>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <h1>外摄显像</h1>
                    <span>包含全景AVM、倒车后视、行车记录摄像模组；应用于全景显示、自动泊车、倒车显示、行车记录等</span>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <h1>舱内监测</h1>
                    <span>包含驾驶员监测、乘客监测摄像模组；应用于驾驶员疲劳等报警、ID识别、眼球追踪等；乘客、遗留物监测，视频通话等</span>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div style={{width: '55%', height: '100%'}}>
              <video width="100%" src={contentThird} controls autoPlay="autoplay" loop muted />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
