import {getState} from "./getState"
import {cutState} from "./cutState"
import {combineReducers} from 'redux'

export const indexReducer=combineReducers({
    getState,cutState
})


