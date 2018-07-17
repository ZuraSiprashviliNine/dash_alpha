
const appReducer = (state = { 
    ready: false,
}, action) => {
    switch(action.type){
        case 'SET': {
            state = {
                ...state,
                ready: action.payload
            };
            break;
        }

        default: {

            break;
        }
    }

    return state;
};


export default appReducer;