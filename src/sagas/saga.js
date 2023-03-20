import { GET_RES,GET_RES_SUCCESS } from '../action/action-type';
import {call, put, takeEvery} from 'redux-saga/effects';     // 引入相关函数
import fetchJsonp from "fetch-jsonp"

function* goAge(action){    // 参数是action创建函数返回的action
    console.log(action)
    const p = function() {
        return fetchJsonp("http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20").then((res)=>{
            //这里对数据进行操作   默认的
            return res.json();
        }).then((res)=>{
            console.log(res);
            return res.result
        }).catch((err)=>{
            console.log(err);
        });
    }
    const res = yield call(p)    // 执行p函数，返回值赋值给res

    yield put({      // dispatch一个action到reducer， payload是请求返回的数据
        type: GET_RES_SUCCESS,
        list: res
    })
}

function* rootSaga() {     // 在store.js中，执行了 sagaMiddleware.run(rootSaga)
    yield takeEvery(GET_RES, goAge)   // 如果有对应type的action触发，就执行goAge()函数
}

export default rootSaga;      // 导出rootSaga，被store.js文件import
