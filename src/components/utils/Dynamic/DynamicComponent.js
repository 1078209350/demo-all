/* eslint-disable no-unused-vars */
/*
 * @Description: In User Settings Edit
 * @Author: huangtianyang
 * @Date: 2020-04-15 19:10
 */

import Decimal from 'decimal.js';
import { DataSet, NumberField } from 'choerodon-ui/pro';
import { isEmpty } from 'lodash';
import { Bind } from 'lodash-decorators';
import { action, observable, runInAction } from 'mobx';
import React from 'react';

/**
 * 动态页面继承class
 * @extends React.Component
 * @class
 */
class DynamicComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutButtons: this.layoutButtonRenderHandler(),
      componentButtons: this.componentButtonRenderHandler(),
      componentRenderers: this.componentRenderHandler(),
      tableFooterRenderers: this.tableFooterRenderHandler(),
      componentFunctions: this.componentFunctions(),
      staticLayoutTabs: this.staticLayoutHandler(),
      shouldCached: this.shouldCached,
      setCacheKey: this.setCacheKey,
      shouldDataSetQueryWhenJump: this.shouldDataSetQueryWhenJump,
      loadHistoryDocumentCategory: this.loadHistoryDocumentCategory,
      fieldDynamicPropsHandler: this.fieldDynamicPropsHandler,
      historyButtonName: this.historyButtonName(),
      currentButtonName: this.currentButtonName(),
      exportDataHandler: this.UNSAFE_exportDataHandler,
      events: {
        update: this.dataSetUpdateHandler,
        query: this.realDataSetQueryHandler,
        afterQuery: this.realDataSetAfterQueryHandler,
        beforeLoad: this.dataSetBeforeLoadHandler,
        load: this.dataSetLoadHandler,
        loadFailed: this.dataSetLoadFailedHandler,
        submit: this.dataSetSubmitHandler,
        submitSuccess: this.dataSetSubmitSuccessHandler,
        submitFailed: this.dataSetSubmitFailedHandler,
        select: this.dataSetSelectHandler,
        unSelect: this.dataSetUnSelectHandler,
        selectAll: this.dataSetSelectAllHandler,
        unSelectAll: this.dataSetUnSelectAllHandler,
        indexChange: this.dataSetIndexChangeHandler,
        fieldChange: this.dataSetFieldChangeHandler,
        create: this.dataSetCreateHandler,
        remove: this.dataSetRemoveHandler,
        export: this.dataSetExportHandler,
        beforeDelete: this.dataSetBeforeDeleteHandler,
        reset: this.dataSetResetHandler,
      },
    };
  }

  @observable spinning = { state: false };

  spinningCounts = 0;

  /**
   * 页脚求和
   * @param dataSet {DataSet} 数据源
   * @param name {String} 名称
   * @return {string} 和
   */
  // getSum(dataSet, name) {
  //   const value =
  //     dataSet.records.length > 0
  //       ? dataSet.records
  //           .reduce(
  //             (previousValue, currentValue) =>
  //               Decimal.add(previousValue, currentValue.get(name) || 0),
  //             new Decimal(0)
  //           )
  //           .toNumber()
  //       : 0;
  //   return `共计: ${NumberField.format(value)}`;
  // }

  /**
   * 页脚平均值
   * @param dataSet {DataSet} 数据源
   * @param name {String} 名称
   * @return {string} 平均值
   */
  // getAverage(dataSet, name) {
  //   const value =
  //     dataSet.records.length > 0
  //       ? dataSet.records
  //           .reduce(
  //             (previousValue, currentValue) =>
  //               Decimal.add(previousValue, currentValue.get(name) || 0),
  //             new Decimal(0)
  //           )
  //           .div(dataSet.records.length)
  //           .mul(100)
  //           .round()
  //           .div(100)
  //           .toNumber()
  //       : 0;
  //   return `平均: ${NumberField.format(value)}`;
  // }

  /**
   * 表格页脚
   * @returns {{layoutCode: string|undefined, renderer: function, tabCode: string|undefined, columnName: string}[]}
   */
  @Bind()
  tableFooterRenderHandler() {
    return [];
  }

  /**
   * 动态属性对象
   * @returns {{layoutCode: string|undefined, dynamicProps: {}, tabCode: string|undefined, columnName: string, editor: boolean|FormField|undefined}[]}
   */
  @Bind()
  fieldDynamicPropsHandler() {
    return [];
  }

  /**
   * 静态嵌入页面
   * @returns {{component: React.Component, tabCode: string}[]|undefined}
   */
  @Bind()
  staticLayoutHandler() {}

  /**
   * 布局按钮渲染
   * @returns {{clickFunction: function, name: string}[]}
   */
  @Bind()
  layoutButtonRenderHandler() {
    return [];
  }

  /**
   *  组件按钮渲染
   * @returns {{layoutCode: string|undefined, clickFunction: function, name: string, tabCode: string|undefined}[]}
   */
  @Bind()
  componentButtonRenderHandler() {
    return [];
  }

  /**
   *  组件超链接渲染
   * @returns {{layoutCode: string|undefined, renderer: function, tabCode: string|undefined, columnName: string, editor: boolean|FormField|undefined}[]}
   */
  @Bind()
  componentRenderHandler() {
    return [
      {
        renderer: () => {},
        columnName: '',
      },
    ];
  }

  @Bind
  componentFunctions() {
    return [];
  }

  @Bind()
  dataSetUpdateHandler({ dataSet, record, name, value, oldValue }) {}

  @Bind()
  dataSetQueryHandler({ dataSet, params, data }) {
    return true;
  }

  @Bind()
  dataSetAfterQueryHandler({ dataSet }) {}

  @Bind()
  realDataSetAfterQueryHandler({ dataSet }) {
    const dsNameSplits = dataSet.name.split('_');
    if (isEmpty(dsNameSplits[4]) && !isEmpty(dsNameSplits[5]) && dsNameSplits[3] === 'form') {
      this.spinningCounts--;
      if (this.spinningCounts === 0) {
        this.unMask();
      }
    }
    this.dataSetAfterQueryHandler({ dataSet });
  }

  @Bind()
  realDataSetQueryHandler({ dataSet, params, data }) {
    const dsNameSplits = dataSet.name.split('_');
    if (isEmpty(dsNameSplits[4]) && !isEmpty(dsNameSplits[5]) && dsNameSplits[3] === 'form') {
      this.spinningCounts++;
      this.mask();
    }
    return this.dataSetQueryHandler({ dataSet, params, data });
  }

  @Bind()
  dataSetBeforeLoadHandler({ dataSet, data }) {}

  @Bind()
  dataSetLoadHandler({ dataSet }) {}

  @Bind()
  dataSetLoadFailedHandler({ dataSet }) {}

  @Bind()
  dataSetSubmitHandler({ dataSet, data }) {
    return true;
  }

  @Bind()
  dataSetSubmitSuccessHandler({ dataSet, data }) {}

  @Bind()
  dataSetSubmitFailedHandler({ dataSet }) {}

  @Bind()
  dataSetSelectHandler({ dataSet, record, previous }) {}

  @Bind()
  dataSetUnSelectHandler({ dataSet, record }) {}

  @Bind()
  dataSetSelectAllHandler({ dataSet }) {}

  @Bind()
  dataSetUnSelectAllHandler({ dataSet }) {}

  @Bind()
  dataSetIndexChangeHandler({ dataSet, record, name, propsName, value, oldValue }) {}

  @Bind()
  dataSetFieldChangeHandler({ dataSet, record, name, propsName, value, oldValue }) {}

  @Bind()
  dataSetCreateHandler({ dataSet, record }) {}

  @Bind()
  dataSetRemoveHandler({ dataSet, records }) {}

  @Bind()
  dataSetExportHandler({ dataSet, params, data }) {
    return true;
  }

  @Bind()
  dataSetBeforeDeleteHandler({ dataSet, records }) {
    return true;
  }

  @Bind()
  dataSetResetHandler({ dataSet, records }) {}

  /**
   * 从其他页面跳转过来数据源是否要更新
   * @returns {{layoutCode: string|undefined, tabCode: string}[]}
   */
  @Bind()
  shouldDataSetQueryWhenJump() {
    return [];
  }

  /**
   * 该页面是否要缓存
   * @returns {boolean}
   */
  @Bind()
  shouldCached() {
    return true;
  }

  /**
   * 设置缓存key
   * @returns {string}
   */
  @Bind()
  setCacheKey() {
    return '';
  }

  /**
   *  获取历史记录查询所需参数
   * @returns {{documentCategory: string|undefined, documentId: number|undefined}}
   */
  @Bind()
  loadHistoryDocumentCategory() {
    return {};
  }

  /**
   * 遮罩
   */
  @action.bound mask() {
    this.spinning.state = true;
  }

  /**
   * 解除遮罩
   */
  @action.bound unMask() {
    this.spinning.state = false;
  }

  @Bind()
  historyButtonName() {}

  @Bind()
  currentButtonName() {}

  // @Bind()
  // setTabActiveKey(tabCode, activeKey) {
  //   runInAction(() => {
  //     this.tabMap.set(tabCode, String(activeKey));
  //   });
  // }

  /**
   * 校验数据源
   * @param {DataSet|undefined} dataSet
   * @return {Promise}
   */
  @Bind()
  validateAll(dataSet = this.dataSets.top) {
    return Promise.all(
      Object.values(dataSet.children).map(ds =>
        Promise.all([
          this.validateAll(ds),
          ...ds.data.map(record => record.validate(true, true)),
        ]).then(results => results.every(result => result))
      )
    ).then(results => results.every(result => result));
  }

  @Bind()
  // eslint-disable-next-line camelcase
  UNSAFE_exportDataHandler({ data, dataSet }) {}
}

export default DynamicComponent;
