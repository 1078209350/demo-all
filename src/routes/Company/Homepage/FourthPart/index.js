import React from 'react';
import styles from './index.less';

export default class FourthPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledBtn: true, // 第四部分左边按钮悬停是否隐藏
    };
  }

  render() {
    return (
      <div className={styles['content-fourth']}>
        <h1 className={styles.title}>市场亮点</h1>
        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.mask} />
            <div className={styles.desc}>
              <p className={styles.p1}>环境感知</p>
              <p className={styles.p2}>
                <span className={styles['p2-span']}>- </span>车大灯鬼像抑制
              </p>
              <p className={styles.p2}>
                <span className={styles['p2-span']}>- </span>高低温成像清晰
              </p>
              <p className={styles.p2}>
                <span className={styles['p2-span']}>- </span>结构抗震不松动
              </p>
              <div className={styles.btn}>{`查看详情 --->`}</div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.right1}>
              <div className={styles.mask} />
              <div className={styles.desc}>
                <p className={styles.p1}>外摄显像</p>
                <p className={styles.p2}>
                  <span className={styles['p2-span']}>- </span>动态范围宽，明暗可兼顾
                </p>
                <p className={styles.p2}>
                  <span className={styles['p2-span']}>- </span>输出帧率高，视觉延迟小
                </p>
                <p className={styles.p2}>
                  <span className={styles['p2-span']}>- </span>功耗低，高低温温变小
                </p>
                <p className={styles.p2}>
                  <span className={styles['p2-span']}>- </span>温变图像清晰
                </p>
                <p className={styles.p2}>
                  <span className={styles['p2-span']}>- </span>自加热，除雾，防结露
                </p>
                <div className={styles.btn}>{`查看详情 --->`}</div>
              </div>
            </div>
            <div className={styles.right2}>
              <div className={styles.mask} />
              <div className={styles.desc}>
                <p className={styles.p1}>显像感知</p>
                <p className={styles.p2}>
                  <span className={styles['p2-span']}>- </span>IP69K防护等级
                </p>
                <p className={styles.p2}>
                  <span className={styles['p2-span']}>- </span>光心精度高，拼接偏差小
                </p>
                <p className={styles.p2}>
                  <span className={styles['p2-span']}>- </span>高低温图像清晰
                </p>
                <p className={styles.p2}>
                  <span className={styles['p2-span']}>- </span>防结露，快速除雾
                </p>
                <div className={styles.btn}>{`查看详情 --->`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
