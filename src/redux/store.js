import {createStore,applyMiddleware} from 'redux'
import {indexReducer } from '../reducers/index'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../sagas/saga"

const saga=createSagaMiddleware()
//生成store对象
const store = createStore(indexReducer,applyMiddleware(saga));//内部会第一次调用reducer函数，得到初始state

saga.run(rootSaga)
export default store
