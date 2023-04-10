// /*
//  * @Description: In User Settings Edit
//  * @Author: huangtianyang
//  * @Date: 2020-01-16 14:56
//  */
// import { HLS_HLLC } from '@utils/config';
// import { Modal } from 'choerodon-ui/pro';
// import { Content, Header } from 'hzero-front/lib/components/Page';
// import { getAccessToken, getCurrentOrganizationId } from 'hzero-front/lib/utils/utils';
// import { axios } from 'hzero-front/lib/utils/withTokenAxios';
// import { Button, Label, Table } from 'leaf-ui/pro';
// import { Bind } from 'lodash-decorators';
// import querystring from 'querystring';
// import React, { Component } from 'react';
// import { API_HOST } from 'utils/config';
// import intl from 'utils/intl';
// import notification from 'utils/notification';
// // import Import from '../../components/Import';
// import LayoutButtonModal from './LayoutButton';
// import LayoutCopyModal from './LayoutCopyComponent';
//
// /**
//  * 布局定义
//  * @extends {Component}
//  * @class
//  * @ReactProps {DataSet} dataSet
//  * @ReactProps {History} history - 路由
//  */
// class LayoutComponent extends Component {
//   /**
//    *@param {Record} record
//    */
//   @Bind()
//   editRender({ record }) {
//     const layoutCode = record.get('layoutCode');
//     const layoutId = record.get('id');
//     return (
//       <div>
//         <Label
//           funcType="underline"
//           onClick={() =>
//             this.props.history.push(`/hllc/layout/layout-tab/${layoutCode}/${layoutId}`)
//           }
//           key="tabEdit"
//         >
//           编辑
//         </Label>
//         <Label
//           funcType="underline"
//           onClick={() =>
//             this.btnConfigModal({ match: { params: { type: 'LAYOUT', parentId: layoutId } } })
//           }
//           key="btnEdit"
//         >
//           按钮配置
//         </Label>
//       </div>
//     );
//   }
//
//   btnConfigModal = ({ match }) => {
//     Modal.open({
//       key: Modal.key(),
//       drawer: true,
//       style: { width: '70%' },
//       closable: true,
//       destroyOnClose: true,
//       keyboardClosable: true,
//       footer: null,
//       children: <LayoutButtonModal match={match} />,
//     });
//   };
//
//   layoutCopyModal = () => {
//     const { dataSet } = this.props;
//     const modal = Modal.open({
//       title: '页面布局复制',
//       key: Modal.key(),
//       drawer: false,
//       style: { width: '30%' },
//       closable: true,
//       destroyOnClose: true,
//       keyboardClosable: true,
//       footer: null,
//       children: <LayoutCopyModal modal={modal} dataSet={dataSet} />,
//     });
//   };
//
//   /**
//    *
//    * @param {DataSet} dataSet
//    * @returns {Promise<void>}
//    */
//   @Bind()
//   async submit(dataSet) {
//     const isValidate = await dataSet.validate();
//     if (isValidate) {
//       const res = await dataSet.submit();
//       if (!res && res.failed && res.message) {
//         notification.error({ message: res.message });
//       }
//     } else {
//       notification.error({
//         message: intl.get('hzero.common.notification.invalid').d('校验不通过'),
//       });
//     }
//   }
//
//   render() {
//     const { dataSet } = this.props;
//     const { Column } = Table;
//     return (
//       <>
//         <Header title={intl.get('hllc.layout.config').d('布局定义')}>
//           <Button funcType="raised" icon="save" onClick={() => this.submit(dataSet)} key="save">
//             {intl.get('hzero.common.button.save').d('保存')}
//           </Button>
//           <Button
//             funcType="raised"
//             icon="delete"
//             onClick={() => dataSet.delete(dataSet.selected)}
//             key="delete"
//           >
//             {intl.get('hzero.common.button.delete').d('删除')}
//           </Button>
//           <Button
//             onClick={() => {
//               Modal.open({
//                 key: Modal.key(),
//                 footer: null,
//                 closable: true,
//                 title: '导入',
//                 children: (
//                     <div>11</div>
//                   // <Import
//                   //   action={`${API_HOST}${HLS_HLLC}/v1/${getCurrentOrganizationId()}/doc-layouts/importLayout`}
//                   // />
//                 ),
//               });
//             }}
//           >
//             导入脚本
//           </Button>
//           <Button
//             onClick={async () => {
//               const ids = dataSet.selected.map(record => record.get('id'));
//               if (ids.length === 0) {
//                 notification.error({
//                   message: '至少选择一条数据!',
//                   title: '',
//                 });
//                 return;
//               }
//               window.open(
//                 `${API_HOST}${HLS_HLLC}/v1/${getCurrentOrganizationId()}/doc-layouts/exportLayout?${querystring.stringify(
//                   { ids, access_token: getAccessToken() }
//                 )}`
//               );
//             }}
//           >
//             导出脚本
//           </Button>
//           <Button
//             funcType="raised"
//             icon="add"
//             type="primary"
//             color="primary"
//             onClick={() => dataSet.create({})}
//             key="add"
//           >
//             {intl.get('hzero.common.button.add').d('新建')}
//           </Button>
//           <Button
//             funcType="raised"
//             type="primary"
//             color="primary"
//             onClick={() => this.layoutCopyModal()}
//             key="add"
//           >
//             复制页面布局
//           </Button>
//           <Button
//             funcType="raised"
//             ype="primary"
//             color="primary"
//             key="clearCache"
//             onClick={async () => {
//               const { selected } = dataSet;
//               if (selected.length === 0) {
//                 notification.error({ message: '请选择一条记录' });
//               } else {
//                 try {
//                   await axios.post(
//                     `${HLS_HLLC}/v1/${getCurrentOrganizationId()}/doc-layouts/config/clear`,
//                     selected.map(record => record.get('layoutCode'))
//                   );
//                   notification.success({
//                     message: '刷新缓存成功!',
//                     title: '',
//                   });
//                 } catch (e) {
//                   notification.error({
//                     message: e.message,
//                     title: '',
//                   });
//                 }
//               }
//             }}
//           >
//             清除缓存
//           </Button>
//         </Header>
//         <Content>
//           <Table dataSet={dataSet} border queryFieldsLimit={2} buttons={['export']}>
//             <Column name="layoutCode" editor width="25%" />
//             <Column name="description" editor width="30%" />
//             <Column name="enableFlag" editor width="15%" />
//             <Column name="edit" renderer={this.editRender} width="20%" />
//           </Table>
//         </Content>
//       </>
//     );
//   }
// }
//
// export default LayoutComponent;
