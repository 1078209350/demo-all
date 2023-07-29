import React from 'react';
import styles from './index.less';

export default class FifthPart extends React.Component {
  render() {
    return (
      <div className={styles['content-fifth']}>
        <div className={styles.mask} />
        <div className={styles.desc}>
          <p className={styles.p1}>舱内监测</p>
          <p className={styles.p2}>
            <span className={styles['p2-span']}>- </span>外观精致，尺寸小巧
          </p>
          <p className={styles.p2}>
            <span className={styles['p2-span']}>- </span>高度补偿，画质均匀
          </p>
          <p className={styles.p2}>
            <span className={styles['p2-span']}>- </span>墨镜穿透，抗环境干扰
          </p>
          <p className={styles.p2}>
            <span className={styles['p2-span']}>- </span>人眼安全，消除红曝
          </p>
          <div className={styles.btn}>{`查看详情 --->`}</div>
        </div>
      </div>
    );
  }
}
