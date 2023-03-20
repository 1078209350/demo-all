import { combineReducers } from 'redux';
import addReducer from "./addReducer";
import cutReducer from "./cutReducer"


const reducers = combineReducers({
    a:addReducer,
    b:cutReducer
});

export default reducers;
