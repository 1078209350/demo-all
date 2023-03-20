const cutReducer = function(state =5, action) {
    switch(action.type) {
        case 'CUT_NUM':{
            console.log('执行成功',state);
            let x=state-action.result;
            console.log(x);
            return x
        }
        default:
            return state;
    }

};
export default cutReducer
