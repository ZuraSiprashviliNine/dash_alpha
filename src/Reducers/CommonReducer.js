
const commonReducer = (state = {
    ready: false,
    info: null,
    artist: null,
    contact: null
}, action) => {
    switch(action.type){

        case 'SET_COMMON_READY': {
            state = {
                ...state,
                ready: action.payload
            };
            break;
        }

        case 'SET_ARTIST_FULFILLED': {
            state = {
                ...state,
                artist: action.payload
            };
            break;
        }

        case 'SET_INFO_FULFILLED': {
            state = {
                ...state,
                info: action.payload
            };
            break;
        }

        case 'SEND_CONTACT_MESSAGE_FULFILLED': {
            state = {
                ...state,
                contact: action.payload
            };
            break;
        }

        default: {

            break;
        }
    }

    return state;
};

export default commonReducer;