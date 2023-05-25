import React from 'react';
import classnames from 'classnames';
import { Bind } from 'lodash-decorators';

import advert1 from '@public/company/advert1.mov';
import advert2 from '@public/company/advert2.png';
import advert3 from '@public/company/advert3.png';
import styles from './index.less';

export default class FirstPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advertOrder: 1,
    };
  }

  componentDidMount() {
    setInterval(() => {
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
  cancelHandle(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  @Bind()
  handleAdvertBarItem1() {
    console.log(2222);
  }

  render() {
    const { advertOrder } = this.state;
    return (
      <div className={styles['content-first']}>
        <div
          className={styles.advert}
          style={{
            visibility: advertOrder === 1 ? 'visible' : 'hidden',
            zIndex: advertOrder === 1 ? 99 : 0,
          }}
        >
          <div
            className={classnames(
              styles['advert-desc'],
              styles.animated,
              styles.animatedFadeInUp,
              styles.fadeInUp
            )}
            style={{ display: advertOrder === 1 ? 'flex' : 'none' }}
          >
            <div className={classnames(styles.noselect)}>————————————</div>
            <div style={{ marginLeft: '10px' }}>
              <p className={classnames(styles.noselect, styles.desc1)}>愿景</p>
              <p className={classnames(styles.noselect, styles.desc2)}>
                成为全球智能驾驶领域的领军企业
              </p>
              <button
                type="button"
                className={styles['desc-btn']}
                onClick={() => {
                  console.log(111111);
                }}
              >
                了解我们
              </button>
            </div>
          </div>
          <div className={classnames(styles['advert-bar'])}>
            <div className={styles['advert-bar-item1']} onClick={this.handleAdvertBarItem1}>
              <div className={styles['bar-item1']} />
            </div>
            <div className={styles['advert-bar-item2']}>
              <div className={styles['bar-item2']} />
            </div>
            <div className={styles['advert-bar-item3']}>
              <div className={styles['bar-item3']} />
            </div>
          </div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            width="100%"
            src={advert1}
            type="video/mp4"
            controls
            autoPlay="autoplay"
            loop
            muted
            onClick={this.cancelHandle}
          />
        </div>
        <div
          className={styles.advert}
          style={{
            visibility: advertOrder === 2 ? 'visible' : 'hidden',
            zIndex: advertOrder === 2 ? 99 : 0,
          }}
        >
          <div
            className={classnames(
              styles['advert-desc'],
              styles.animated,
              styles.animatedFadeInUp,
              styles.fadeInUp
            )}
            style={{ display: advertOrder === 2 ? 'flex' : 'none' }}
          >
            <div className={classnames(styles.noselect)}>————————————</div>
            <div style={{ marginLeft: '10px' }}>
              <p className={classnames(styles.noselect, styles.desc1)}>
                全球首颗量产8M前视感知模组
              </p>
              <p className={classnames(styles.noselect, styles.desc2)}>
                看得更远、更清、更广、更加安全
              </p>
              <button
                type="button"
                className={styles['desc-btn']}
                onClick={() => {
                  console.log(111111);
                }}
              >
                了解我们
              </button>
            </div>
          </div>
          <div className={classnames(styles['advert-bar'])}>
            <div className={styles['advert-bar-item1']} onClick={this.handleAdvertBarItem1}>
              <div className={styles['bar-item1']} />
            </div>
            <div className={styles['advert-bar-item2']}>
              <div className={styles['bar-item2']} />
            </div>
            <div className={styles['advert-bar-item3']}>
              <div className={styles['bar-item3']} />
            </div>
          </div>
          <img className={styles['advert-img']} src={advert2} alt="" />
        </div>
        <div
          className={styles.advert}
          style={{
            visibility: advertOrder === 3 ? 'visible' : 'hidden',
            zIndex: advertOrder === 3 ? 99 : 0,
          }}
        >
          <div
            className={classnames(
              styles['advert-desc'],
              styles.animated,
              styles.animatedFadeInUp,
              styles.fadeInUp
            )}
            style={{ display: advertOrder === 3 ? 'flex' : 'none' }}
          >
            <div className={classnames(styles.noselect)}>————————————</div>
            <div style={{ marginLeft: '10px' }}>
              <p className={classnames(styles.noselect, styles.desc1)}>使命</p>
              <p className={classnames(styles.noselect, styles.desc2)}>
                专注汽车安全，呵护人类生命
              </p>
              <button
                type="button"
                className={styles['desc-btn']}
                onClick={() => {
                  console.log(111111);
                }}
              >
                了解我们
              </button>
            </div>
          </div>
          <div className={classnames(styles['advert-bar'])}>
            <div className={styles['advert-bar-item1']} onClick={this.handleAdvertBarItem1}>
              <div className={styles['bar-item1']} />
            </div>
            <div className={styles['advert-bar-item2']}>
              <div className={styles['bar-item2']} />
            </div>
            <div className={styles['advert-bar-item3']}>
              <div className={styles['bar-item3']} />
            </div>
          </div>
          <img className={styles['advert-img']} src={advert3} alt="" />
        </div>
        {/* 放一个元素撑高父元素 */}
        <div style={{ visibility: 'hidden' }}>
          <img style={{ width: '100%' }} src={advert3} alt="" />
        </div>
      </div>
    );
  }
}
