import {GET_RES_SUCCESS} from "../action/action-type"
function kong() {
    return{
        list:[]
    }
}
export function getState(state=kong(),action){
    if(action.type=="GET_RES_SUCCESS"){
        return Object.assign({}, state, { list: action.list });
    }else {
        return state
    }
}
