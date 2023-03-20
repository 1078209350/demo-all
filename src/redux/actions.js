import { ADDNAME,ADDAGE } from "./action-type";
import store from "./store";

//包含所有的action creator
export const addNameCreater = (name) =>({type:ADDNAME,data:name})//这里返回的对象会自动执行dispatch,将生成的新的state返回给store
export const addAgeCreater = (age) =>({type:ADDAGE,data:age})
export const addNameAsync = (name) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(addNameCreater(name))
        },2000);
    }
}
