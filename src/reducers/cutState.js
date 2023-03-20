import {CUTNUM} from "../action/action-type"
export function cutState(state=0,action){
    if(action.type=="CUTNUM"){
        return state-1
    }else {
        return state
    }
}
