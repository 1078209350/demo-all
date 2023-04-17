import React from 'react';
import { connect } from 'dva';
import { Button , Table} from 'antd';
import classnames  from 'classnames';
import styles from './IndexPage.less';

class IndexPage extends React.Component{
  changeData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'indexpage/addUser',
      payload: {},
    });
  };

  render() {
    const { columns, data } = this.props.indexpage; //获取indexpage中的state
    console.log(this.props);
    return (
      <div>
        <Button type="primary" onClick={this.changeData}>修改数据</Button>
        <div>
          <Table columns={columns} dataSource={data}/>
        </div>
        <div className={classnames({animated: styles.animated, animatedFadeInUp: styles.animatedFadeInUp, fadeInUp: styles.fadeInUp})}>
          <h1>It's easy.</h1>
        </div>
        <div className="animated animatedFadeInUp fadeInUp">
          <h2>Search</h2>
          <p>Know what you want to listen to? Just search and hit play.</p>
        </div>
        <div className="animated animatedFadeInUp fadeInUp">
          <h2>Browse</h2>
          <p>Check out the latest charts, brand new releases and great playlists for right now.</p>
        </div>
        <div className="animated animatedFadeInUp fadeInUp">
          <h2>Discover</h2>
          <p>Enjoy new music every Monday with your own personal playlist. Or sit back and enjoy Radio.</p>
        </div>
      </div>
    )
  }
}

IndexPage.propTypes = {
};

export default connect(({indexpage})=>({
    indexpage
}))(IndexPage);
