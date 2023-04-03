/*
 * @Description: Dynamic Decorator
 * @Author: huangtianyang
 * @Date: 2020-01-16 10:00
 */
import { isEqual } from 'lodash';
import { Bind } from 'lodash-decorators';
import { Provider } from 'mobx-react';
import querystring from 'querystring';
import React from 'react';
import { observable } from 'mobx';
import BaseDynamicComponent from '../../BaseDynamicComponent';
import Store from '../../store';
import Constants from './Constants';

export const SpinningContext = React.createContext({ state: false });

/**
 * 动态页面组件
 * @param args
 */
export default function Dynamic(...args) {
  let layoutCode;
  let params;
  if (typeof args[0] === 'string') {
    [layoutCode, params] = args;
  } else {
    [params] = args;
  }
  return target => {
    return class extends target {
      constructor(props) {
        super(props);
        this.store = new Store();
        this.dataSets = {};
        if (props.location) {
          const { search } = props.location;
          if (search) {
            const queryString = search.replace('?', '');
            this.urlSearchParams = querystring.parse(queryString);
            this.readOnly = this.urlSearchParams.readOnly;
          }
        }
      }

      tabMap = observable.map({});

      qpara;

      urlSearchParams = {};

      @Bind()
      layoutCodeQuery() {
        const { disabled } = this.props;
        this.qpara = {
          readOnly: this.readOnly === Constants.YES || (disabled !== undefined ? disabled : false),
          ...params,
        };
        if (this.store.config.datas !== null && isEqual(this.qpara, this.store.config.param)) {
          return;
        }
        if (layoutCode) {
          this.store.query(
              layoutCode,
              this.qpara,
              this.loadHistoryDocumentCategory ? this.loadHistoryDocumentCategory() : {}
          );
        } else {
          this.store.queryRoute(
              this.props.match.path,
              this.qpara,
              this.loadHistoryDocumentCategory ? this.loadHistoryDocumentCategory() : {}
          );
        }
      }

      /**
       * 配置数据集
       * @param {Array.<DataSet>} dataSets
       * @returns {Array.<DataSet>}
       */
      @Bind()
      configDataSets(dataSets) {
        if (super.configDataSets) {
          return super.configDataSets(dataSets);
        }
        return dataSets;
      }

      @Bind()
      loadDataSets(dataSets) {
        this.dataSets = dataSets;
      }

      render() {
        return (
            <React.Fragment>
              <SpinningContext.Provider value={super.spinning}>
                <Provider config={this.store}>
                  <BaseDynamicComponent
                      tabMap={this.tabMap}
                      {...this.props}
                      loadDataSets={this.loadDataSets}
                      backPath={this.state && this.state.backPath}
                      tableFooterRenderers={
                        this.state && this.state.tableFooterRenderers
                            ? this.state.tableFooterRenderers
                            : []
                      }
                      headerButtons={
                        this.state && this.state.headerButtons ? this.state.headerButtons : []
                      }
                      layoutButtons={
                        this.state && this.state.layoutButtons ? this.state.layoutButtons : []
                      }
                      componentButtons={
                        this.state && this.state.componentButtons ? this.state.componentButtons : []
                      }
                      componentRenderers={
                        this.state && this.state.componentRenderers ? this.state.componentRenderers : []
                      }
                      componentFunctions={
                        this.state && this.state.componentFunctions ? this.state.componentFunctions : []
                      }
                      staticLayoutTabs={
                        this.state && this.state.staticLayoutTabs ? this.state.staticLayoutTabs : []
                      }
                      loadHistoryDocumentCategory={
                        this.state && this.state.loadHistoryDocumentCategory
                            ? this.state.loadHistoryDocumentCategory
                            : () => ({})
                      }
                      configDataSets={this.configDataSets}
                      events={this.state && this.state.events ? this.state.events : {}}
                      shouldCached={
                        this.state && this.state.shouldCached ? this.state.shouldCached : () => true
                      }
                      setCacheKey={
                        this.state && this.state.setCacheKey ? this.state.setCacheKey : () => ''
                      }
                      shouldDataSetQueryWhenJump={
                        this.state && this.state.shouldDataSetQueryWhenJump
                            ? this.state.shouldDataSetQueryWhenJump
                            : () => []
                      }
                      fieldDynamicPropsHandler={
                        this.state && this.state.fieldDynamicPropsHandler
                            ? this.state.fieldDynamicPropsHandler
                            : () => []
                      }
                      historyButtonName={this.state && this.state.historyButtonName}
                      currentButtonName={this.state && this.state.currentButtonName}
                      exportDataHandler={
                        this.state && this.state.exportDataHandler
                            ? this.state.exportDataHandler
                            : () => {}
                      }
                  />
                </Provider>
              </SpinningContext.Provider>
            </React.Fragment>
        );
      }

      componentDidMount() {
        if (super.componentDidMount) {
          super.componentDidMount();
        }
        this.layoutCodeQuery();
      }
    };
  };
}
