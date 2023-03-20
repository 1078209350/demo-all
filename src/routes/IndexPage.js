import React from 'react';
import { connect } from 'dva';
import { Button , Table} from 'antd';
import styles from './IndexPage.css';

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
      </div>
    )
  }
}

IndexPage.propTypes = {
};

export default connect(({indexpage})=>({
    indexpage
}))(IndexPage);
