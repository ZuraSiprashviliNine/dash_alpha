
const userReducer = (state = {
    user: null
}, action) => {
    switch(action.type){
        case 'SET_USER_FULFILLED': {
            state = {
                ...state,
                user: action.payload
            };
            
            break;
        }

        default: {

            break;
        }
    }

    return state;
};

export default userReducer;