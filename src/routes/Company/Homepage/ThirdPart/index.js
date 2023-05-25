import React from 'react';
import classnames from 'classnames';
import { Bind } from 'lodash-decorators';
import { throttle } from 'lodash';

import contentThird1 from '@public/company/contentThird1.mp4';
import contentThird2 from '@public/company/contentThird2.mp4';
import contentThird3 from '@public/company/contentThird3.mp4';
import contentThird4 from '@public/company/contentThird4.mp4';
import styles from './index.less';

export default class ThirdPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thirdVideo: 1, // 第三部分video顺序
    };
  }

  // 主页第三部分 滚轮滚动事件
  @Bind()
  handleWheel = throttle(
    (e) => {
      console.log(222);
      const { thirdVideo } = this.state;
      if (e.deltaY > 0 && thirdVideo < 4) {
        this.setState({
          thirdVideo: thirdVideo + 1,
        });
      }
      if (e.deltaY < 0 && thirdVideo > 1) {
        this.setState({
          thirdVideo: thirdVideo - 1,
        });
      }
    },
    1000,
    { trailing: false }
  );

  // 主页第三部分 点击切换video
  @Bind()
  handleChangeThirdVideo(index) {
    this.setState({
      thirdVideo: index,
    });
  }

  render() {
    const { thirdVideo } = this.state;
    return (
      <div className={styles['content-third']} onWheel={(e) => this.handleWheel(e)}>
        <div className={styles['third-left']}>
          <ul className={styles.paging}>
            <li className={styles.li} onClick={() => this.handleChangeThirdVideo(1)}>
              <div className={styles['dot-container']}>
                <span className={thirdVideo === 1 ? styles['dot-active'] : styles.dot} />
              </div>
              <span>环境感知</span>
            </li>
            <li className={styles.li} onClick={() => this.handleChangeThirdVideo(2)}>
              <div className={styles['dot-container']}>
                <span className={thirdVideo === 2 ? styles['dot-active'] : styles.dot} />
              </div>
              <span>显像感知</span>
            </li>
            <li className={styles.li} onClick={() => this.handleChangeThirdVideo(3)}>
              <div className={styles['dot-container']}>
                <span className={thirdVideo === 3 ? styles['dot-active'] : styles.dot} />
              </div>
              <span>外摄显像</span>
            </li>
            <li className={styles.li} onClick={() => this.handleChangeThirdVideo(4)}>
              <div className={styles['dot-container']}>
                <span className={thirdVideo === 4 ? styles['dot-active'] : styles.dot} />
              </div>
              <span>舱内检测</span>
            </li>
          </ul>
          <div className={styles.desc}>
            <div
              style={{ display: thirdVideo === 1 ? 'block' : 'none' }}
              className={classnames(
                styles.item,
                styles.animated,
                styles.animatedFadeInUp,
                styles.fadeInUp
              )}
            >
              <h1 className={styles['desc-title']}>环境感知</h1>
              <span className={styles['desc-detail']}>
                包含前视单目、多目、周视摄像模组；应用于机器视觉的视觉数据采集输入，实现高级驾驶辅助等
              </span>
            </div>
            <div
              style={{ display: thirdVideo === 2 ? 'block' : 'none' }}
              className={classnames(
                styles.item,
                styles.animated,
                styles.animatedFadeInUp,
                styles.fadeInUp
              )}
            >
              <h1 className={styles['desc-title']}>显像感知</h1>
              <span className={styles['desc-detail']}>
                包含电子侧视盲区监测摄像模组、电子流媒体后视摄像模组等；应用于侧视盲区监测，后视流媒体识别等
              </span>
            </div>
            <div
              style={{ display: thirdVideo === 3 ? 'block' : 'none' }}
              className={classnames(
                styles.item,
                styles.animated,
                styles.animatedFadeInUp,
                styles.fadeInUp
              )}
            >
              <h1 className={styles['desc-title']}>外摄显像</h1>
              <span className={styles['desc-detail']}>
                包含全景AVM、倒车后视、行车记录摄像模组；应用于全景显示、自动泊车、倒车显示、行车记录等
              </span>
            </div>
            <div
              style={{ display: thirdVideo === 4 ? 'block' : 'none' }}
              className={classnames(
                styles.item,
                styles.animated,
                styles.animatedFadeInUp,
                styles.fadeInUp
              )}
            >
              <h1 className={styles['desc-title']}>舱内监测</h1>
              <span className={styles['desc-detail']}>
                包含驾驶员监测、乘客监测摄像模组；应用于驾驶员疲劳等报警、ID识别、眼球追踪等；乘客、遗留物监测，视频通话等
              </span>
            </div>
          </div>
          {/* <Swiper
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
                  clickable: true,
                  // type: 'custom',
                  renderBullet: (index, className) => {
                    return `<span class='${className}'></span><span>${index ===0? "环境感知": index ===1? "显像感知": index ===2? "外摄显像":"舱内检测"}</span>`;
                  },
                  renderCustom: (swiper, current, total) => {
                    let paginationHtml = "";
                    for (let i = 0; i < total; i++) {
                      // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
                      if (i === (current - 1)) {
                        paginationHtml += `<span class='${classnames(styles['swiper-pagination-customs'], styles['swiper-pagination-customs-active'])}'>1111</span>`;
                      }else{
                        paginationHtml += `<span class='${styles['swiper-pagination-customs']}'>2222</span>`;
                      }
                    }
                    return paginationHtml;
                  },
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
                <div className="swiper-pagination" />
              </Swiper> */}
        </div>
        <div className={styles['third-right']}>
          <video
            style={{ display: thirdVideo === 1 ? 'inline-block' : 'none' }}
            width="100%"
            src={contentThird1}
            controls
            autoPlay="autoplay"
            loop
            muted
          />
          <video
            style={{ display: thirdVideo === 2 ? 'inline-block' : 'none' }}
            width="100%"
            src={contentThird2}
            controls
            autoPlay="autoplay"
            loop
            muted
          />
          <video
            style={{ display: thirdVideo === 3 ? 'inline-block' : 'none' }}
            width="100%"
            src={contentThird3}
            controls
            autoPlay="autoplay"
            loop
            muted
          />
          <video
            style={{ display: thirdVideo === 4 ? 'inline-block' : 'none' }}
            width="100%"
            src={contentThird4}
            controls
            autoPlay="autoplay"
            loop
            muted
          />
        </div>
      </div>
    );
  }
}
