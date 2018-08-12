
const navigationReducer = (state = {
    ready: false,
    currentPage: null,
    history: [],
    pages: null,
    drawer: false,
    scrolled: false
}, action) => {
    switch(action.type){

        case 'SET_NAVIGATION_DRAWER': {
            state = {
                ...state,
                drawer: action.payload
            };
            break;
        }
        
        case 'SET_NAVIGATION_SCROLLED': {
            state = {
                ...state,
                scrolled: action.payload
            };
            break;
        }
        
        case 'SET_NAVIGATION_READY': {
            state = {
                ...state,
                ready: action.payload
            };
            break;
        }
        
        case 'SWITCH_PAGE': {
            state = {
                ...state,
                currentPage: action.payload
            };
            break;
        }

        case 'ADD_PAGE_HISTORY': {
            state = {
                ...state,
                history: [
                    ...state.history,
                    action.payload
                ]
            };
            break;
        }

        case 'SET_PAGES_FULFILLED': {
            state = {
                ...state,
                pages: action.payload
            };
            break;
        }

        default: {

            break;
        }
    }

    return state;
};

export default navigationReducer;