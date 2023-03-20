const addReducer = function(state = 0, action) {
    switch(action.type) {
        case 'ADD_NUM':
            return action.result;
        default:
            return state;
    }

};
export default addReducer
