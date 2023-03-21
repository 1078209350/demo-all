import { combineReducers } from 'redux';

//所有的reducer
const initialListState = {
    list: []
};
const userReducer = function(state = initialListState, action) {
    switch(action.type) {
        case 'USER_LIST_SUCCESS':
            return Object.assign({}, state, { list: action.list });
    }
    return state;
};
const widgetReducer = function(state = initialListState, action) {
    switch(action.type) {
        case 'USER_LIST_FAIL':
            return Object.assign({}, state, { list: action.list });
    }
    return state;
};
//复合reducer
const reducers = combineReducers({
     userReducer,
     widgetReducer
});

export default reducers
