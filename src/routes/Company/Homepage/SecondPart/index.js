import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel, Pagination } from 'swiper/core'; // 引入核心插件和自动播放组件

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

SwiperCore.use([Mousewheel, Pagination]); // 使用插件，插件名放入[]中，这一行是重点

export default class SecondPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles['content-second']}>
        <h1 className={styles.title}>赋能高阶自动驾驶，为客户增值</h1>
        <div style={{ width: '100%', height: '600px', textAlign: 'center' }}>
          <Swiper
            style={{ width: '100%', height: '600px' }}
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
            {[
              pro1,
              pro2,
              pro3,
              pro4,
              pro5,
              pro6,
              pro7,
              pro8,
              pro9,
              pro10,
              pro11,
              pro12,
              pro13,
              pro14,
            ].map((item) => (
              <SwiperSlide>
                <img style={{ height: '100%' }} src={item} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
}
