
const homeReducer = (state = {
    ready: false,
    particles: null
}, action) => {
    switch(action.type){
        case 'SET_HOME': {
            state = {
                ...state,
                ready: action.payload
            };
            break;
        }

        case 'SET_HOME_PARTICLES_FULFILLED': {
            state = {
                ...state,
                particles: action.payload
            };
            break;
        }

        default: {

            break;
        }
    }

    return state;
};

export default homeReducer;