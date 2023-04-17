import { DataSet } from 'choerodon-ui/pro';
import React from 'react';
import LayoutComponent from './LayoutComponent';
import layoutDataSetConfig from './store';

class Layout extends React.Component {
  dataSet = new DataSet(layoutDataSetConfig);

  render() {
    return <LayoutComponent dataSet={this.dataSet} history={this.props.history} />;
  }
}

export default Layout;
