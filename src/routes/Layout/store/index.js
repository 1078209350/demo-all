// /*
//  * @Description: In User Settings Edit
//  * @Author: huangtianyang
//  * @Date: 2020-01-16 11:28
//  */
//
// import intl from 'utils/intl';
// import { getCurrentOrganizationId } from 'hzero-front/lib/utils/utils';
// import { getDataSetConfig } from '@utils/utils';
//
// export default getDataSetConfig({
//   primaryKey: 'id',
//   autoQuery: true,
//   restUrl: `127.0.0.1:8080/v1/${getCurrentOrganizationId()}/doc-layouts/batch`,
//   restBatchUrl: `127.0.0.1:8080/v1/${getCurrentOrganizationId()}/doc-layouts/batch`,
//   queryFields: [
//     {
//       name: 'layoutCode',
//       type: 'string',
//       label: intl.get('hllc.layout.config.layoutCode').d('布局代码'),
//       maxLength: 255,
//     },
//     {
//       name: 'description',
//       type: 'string',
//       label: intl.get('hllc.layout.config.description').d('描述'),
//       maxLength: 255,
//     },
//   ],
//   fields: [
//     {
//       name: 'id',
//       type: 'number',
//     },
//     {
//       name: 'layoutCode',
//       type: 'string',
//       label: intl.get('hllc.layout.config.layoutCode').d('布局代码'),
//       maxLength: 255,
//     },
//     {
//       name: 'description',
//       type: 'string',
//       label: intl.get('hllc.layout.config.description').d('描述'),
//       maxLength: 255,
//     },
//     {
//       name: 'changeTimesApi',
//       type: 'string',
//       label: intl.get('hllc.layout.config.changeTimesApi').d('历史次数查询url'),
//     },
//     {
//       name: 'enableFlag',
//       type: 'boolean',
//       label: intl.get('hllc.layout.config.enableFlag').d('是否启用'),
//       trueValue: 'Y',
//       falseValue: 'N',
//     },
//   ],
// });
